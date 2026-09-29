from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.database.models import Report, Case, User
from app.reports.generator import ReportGenerator
from app.blockchain.factory import get_blockchain_provider
from app.analytics.tracer import FundFlowTracer
from app.risk.risk_engine import ExplainableRiskEngine
from app.ai.assistant import TraceXAssistant
from app.auth.dependencies import get_current_user, log_audit
from app.schemas import ReportCreate
import datetime

router = APIRouter(prefix="/reports", tags=["Investigation Reports"])

@router.get("")
def list_reports(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Report).order_by(Report.created_at.desc()).all()

@router.post("/generate")
def create_report(payload: ReportCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = db.query(Case).filter(Case.id == payload.case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    provider = get_blockchain_provider(case.network)
    wallet_overview = provider.get_wallet_overview(case.primary_wallet, case.network)
    tracer = FundFlowTracer(network=case.network)
    trace_data = tracer.trace(start_address=case.primary_wallet)
    risk_data = ExplainableRiskEngine.calculate_risk(case.primary_wallet, case.network)
    ai_data = TraceXAssistant.generate_investigation_brief(case.primary_wallet, {"case_id": case.case_id, "fraud_type": case.fraud_type})

    case_data = {
        "case_id": case.case_id,
        "complaint_id": case.complaint_id,
        "fraud_type": case.fraud_type,
        "priority": case.priority,
        "status": case.status,
        "amount_involved_usd": case.amount_involved_usd,
        "assigned_investigator": current_user.full_name
    }

    full_report = ReportGenerator.generate_report_data(case_data, wallet_overview, trace_data, risk_data, ai_data)
    
    report_record = Report(
        case_id=case.id,
        report_code=full_report["report_code"],
        title=payload.title or full_report["title"],
        executive_summary=full_report["ai_investigation_brief"],
        risk_assessment=risk_data,
        fund_flow=trace_data,
        vasp_findings=trace_data.get("vasp_exposure", {}),
        ai_narrative=full_report["ai_investigation_brief"],
        investigator_notes=payload.investigator_notes or "Investigative leads verified against on-chain transaction graph. Subpoena pending.",
        evidence_refs=full_report["evidence_inventory"],
        exported_by=current_user.full_name
    )
    db.add(report_record)
    db.commit()
    db.refresh(report_record)

    log_audit(db, current_user, "REPORT_GENERATED", "Report", str(report_record.id), {"report_code": report_record.report_code})

    return {
        "report_id": report_record.id,
        "report_code": report_record.report_code,
        "report_data": full_report
    }

@router.get("/{report_id}")
def get_report_detail(report_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
