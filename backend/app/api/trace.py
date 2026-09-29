from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import User
from app.analytics.tracer import FundFlowTracer
from app.schemas import TraceRequest
from app.auth.dependencies import get_current_user, log_audit

router = APIRouter(prefix="/trace", tags=["Fund Flow Tracing"])

@router.post("")
def trace_funds(payload: TraceRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    tracer = FundFlowTracer(network=payload.network)
    res = tracer.trace(
        start_address=payload.address,
        direction=payload.direction,
        max_hops=payload.max_hops,
        min_amount=payload.min_amount
    )
    log_audit(db, current_user, "TRACE_FUNDS", "Wallet", payload.address, {"direction": payload.direction, "max_hops": payload.max_hops})
    return res
