from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import Case, User
from app.ai.assistant import TraceXAssistant
from app.auth.dependencies import get_current_user, log_audit
from app.schemas import AIIntelligenceRequest

router = APIRouter(prefix="/intelligence", tags=["TRACE-X Intelligence Assistant"])

@router.post("/summarize")
def generate_summary(payload: AIIntelligenceRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case_info = None
    if payload.case_id:
        case = db.query(Case).filter((Case.id == int(payload.case_id)) if payload.case_id.isdigit() else (Case.case_id == payload.case_id)).first()
        if case:
            case_info = {"case_id": case.case_id, "fraud_type": case.fraud_type}

    brief = TraceXAssistant.generate_investigation_brief(
        address=payload.address,
        case_info=case_info,
        risk_info=payload.analysis_data
    )
    log_audit(db, current_user, "AI_SUMMARY_GENERATED", "Wallet", payload.address)
    return brief
