from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.database.models import Case, InvestigationEvent, Evidence, User
from app.schemas import CaseCreate, CaseResponse
from app.auth.dependencies import get_current_user, log_audit, require_role
import datetime
import hashlib
import json

router = APIRouter(prefix="/cases", tags=["Investigation Cases"])

@router.get("", response_model=List[CaseResponse])
def get_cases(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Case).order_by(Case.created_at.desc()).all()

@router.post("", response_model=CaseResponse)
def create_case(case_in: CaseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing = db.query(Case).filter(Case.case_id == case_in.case_id).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Case with ID {case_in.case_id} already exists")

    new_case = Case(
        case_id=case_in.case_id,
        complaint_id=case_in.complaint_id,
        title=case_in.title,
        description=case_in.description,
        fraud_type=case_in.fraud_type,
        priority=case_in.priority,
        primary_wallet=case_in.primary_wallet,
        network=case_in.network,
        amount_involved_usd=case_in.amount_involved_usd,
        victim_reference=case_in.victim_reference,
        assigned_to_id=current_user.id
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    event = InvestigationEvent(
        case_id=new_case.id,
        user_name=current_user.full_name,
        action_type="CASE_CREATED",
        description=f"Investigation case {new_case.case_id} registered for suspect wallet {new_case.primary_wallet} ({new_case.fraud_type})."
    )
    db.add(event)
    db.commit()

    log_audit(db, current_user, "CREATE_CASE", "Case", str(new_case.id), {"case_id": new_case.case_id})
    return new_case

@router.get("/{case_id_or_id}")
def get_case(case_id_or_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = None
    if case_id_or_id.isdigit():
        case = db.query(Case).filter(Case.id == int(case_id_or_id)).first()
    if not case:
        case = db.query(Case).filter(Case.case_id == case_id_or_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    events = db.query(InvestigationEvent).filter(InvestigationEvent.case_id == case.id).order_by(InvestigationEvent.timestamp.desc()).all()
    evidence = db.query(Evidence).filter(Evidence.case_id == case.id).all()
    
    return {
        "case": case,
        "timeline": events,
        "evidence": evidence
    }

# --- 1. INSPECTOR RESPONSIBILITY: Inspect Clues & Diagnose Modus Operandi ---
@router.post("/{case_id}/inspect-clue")
def inspect_clue(case_id: str, payload: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = db.query(Case).filter((Case.id == int(case_id)) if case_id.isdigit() else (Case.case_id == case_id)).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    clue_title = payload.get("title", "Forensic Clue Documented")
    clue_description = payload.get("description", "")
    discovered_wallet = payload.get("discovered_wallet", "")
    modus_operandi = payload.get("modus_operandi", case.fraud_type)

    evidence_item = Evidence(
        case_id=case.id,
        evidence_type="INSPECTOR_CLUE",
        title=f"CLUE: {clue_title}",
        content={
            "discovered_wallet": discovered_wallet,
            "modus_operandi": modus_operandi,
            "inspector_badge": current_user.badge_number,
            "status": "CLUE_VERIFIED"
        },
        notes=clue_description,
        created_by=f"Inspector {current_user.full_name}"
    )
    db.add(evidence_item)

    case.status = "UNDER_ANALYSIS"
    event = InvestigationEvent(
        case_id=case.id,
        user_name=current_user.full_name,
        action_type="CLUE_INSPECTED",
        description=f"Inspector {current_user.full_name} added clue: {clue_title}. Modus operandi diagnosed as {modus_operandi}. Dispatched to Analyst Lab."
    )
    db.add(event)
    db.commit()

    log_audit(db, current_user, "INSPECT_CLUE", "Case", str(case.id), {"clue": clue_title})
    return {"status": "success", "message": "Clue registered and submitted to Analyst Lab", "case_status": case.status}

# --- 2. ANALYST RESPONSIBILITY: Mathematical & Graph Proof Submission ---
@router.post("/{case_id}/submit-analysis")
def submit_analysis(case_id: str, payload: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = db.query(Case).filter((Case.id == int(case_id)) if case_id.isdigit() else (Case.case_id == case_id)).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    analysis_title = payload.get("title", "Topological Graph Analysis Proof")
    peel_chain_volume_decay = payload.get("peel_chain_volume_decay", "12.4% per hop")
    identified_cluster = payload.get("identified_cluster", "CL-1028 (Deposit Sweep Network)")
    vasp_exit_point = payload.get("vasp_exit_point", "Binance Hot Wallet 6")
    confidence_score = payload.get("confidence_score", 94)

    evidence_item = Evidence(
        case_id=case.id,
        evidence_type="ANALYST_PROOF",
        title=f"PROOF: {analysis_title}",
        content={
            "peel_chain_volume_decay": peel_chain_volume_decay,
            "cluster_id": identified_cluster,
            "vasp_exit_point": vasp_exit_point,
            "confidence_score": confidence_score,
            "analyst": current_user.full_name
        },
        notes=f"Forensic mathematical proof completed by Analyst {current_user.full_name}. Identified {vasp_exit_point} with {confidence_score}% confidence.",
        created_by=f"Analyst {current_user.full_name}"
    )
    db.add(evidence_item)

    case.status = "PENDING_VALIDATION"
    event = InvestigationEvent(
        case_id=case.id,
        user_name=current_user.full_name,
        action_type="PROOF_ANALYZED",
        description=f"Analyst {current_user.full_name} completed topology analysis proof for cluster {identified_cluster}. Submitted to Directorate Admin for official validation."
    )
    db.add(event)
    db.commit()

    log_audit(db, current_user, "SUBMIT_PROOF", "Case", str(case.id), {"cluster": identified_cluster})
    return {"status": "success", "message": "Forensic proof submitted to Directorate Admin for validation", "case_status": case.status}

# --- 3. ADMIN RESPONSIBILITY: Directorate Validation & Subpoena Sign-off ---
@router.post("/{case_id}/validate")
def validate_case(case_id: str, payload: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = db.query(Case).filter((Case.id == int(case_id)) if case_id.isdigit() else (Case.case_id == case_id)).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    decision = payload.get("decision", "APPROVED")
    freeze_amount = payload.get("freeze_amount_usd", case.amount_involved_usd or 481305.0)
    target_vasp = payload.get("target_vasp", "Binance Compliance & Investigations")
    
    # Generate cryptographic sign-off seal (SHA-256)
    seal_raw = f"{case.case_id}:{current_user.id}:{datetime.datetime.utcnow().isoformat()}:{decision}"
    validation_seal = hashlib.sha256(seal_raw.encode("utf-8")).hexdigest()

    case.status = "VALIDATED_AND_SUBPOENA_ISSUED" if decision == "APPROVED" else "REJECTED_NEEDS_INFO"

    evidence_item = Evidence(
        case_id=case.id,
        evidence_type="DIRECTORATE_VALIDATION",
        title=f"LEGAL NOTICE: Section 91 CrPC Freeze Order ({case.case_id})",
        content={
            "decision": decision,
            "target_vasp": target_vasp,
            "freeze_amount_usd": freeze_amount,
            "digital_seal_sha256": validation_seal,
            "authorizing_director": current_user.full_name,
            "badge": current_user.badge_number
        },
        notes=f"Directorate validation signed by {current_user.full_name}. Section 91 CrPC notice dispatched to {target_vasp} for immediate asset freeze.",
        created_by=f"Director {current_user.full_name}"
    )
    db.add(evidence_item)

    event = InvestigationEvent(
        case_id=case.id,
        user_name=current_user.full_name,
        action_type="DIRECTORATE_VALIDATED",
        description=f"Directorate Admin {current_user.full_name} officially VALIDATED case findings. Digital Seal: {validation_seal[:16]}... Formal Subpoena issued to {target_vasp}."
    )
    db.add(event)
    db.commit()

    log_audit(db, current_user, "VALIDATE_CASE", "Case", str(case.id), {"seal": validation_seal, "decision": decision})
    return {
        "status": "success",
        "message": f"Case officially validated by Directorate. Freeze order signed.",
        "case_status": case.status,
        "digital_seal": validation_seal
    }
