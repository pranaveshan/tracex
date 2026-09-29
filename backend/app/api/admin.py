from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import User, AuditLog, Case, Alert
from app.auth.dependencies import require_role, get_current_user
from app.config import settings

router = APIRouter(prefix="/admin", tags=["Admin & System Analytics"])

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db), current_user: User = Depends(require_role(["ADMIN"]))):
    total_users = db.query(User).count()
    total_cases = db.query(Case).count()
    total_alerts = db.query(Alert).count()
    total_logs = db.query(AuditLog).count()

    return {
        "total_users": total_users,
        "total_cases": total_cases,
        "total_alerts": total_alerts,
        "audit_events_count": total_logs,
        "blockchain_mode": settings.BLOCKCHAIN_MODE,
        "rpc_status": {
            "ethereum": "Configured (Live)" if settings.ETH_RPC_URL else "Demo Synthetic Provider Active",
            "bsc": "Configured (Live)" if settings.BSC_RPC_URL else "Demo Synthetic Provider Active",
            "polygon": "Configured (Live)" if settings.POLYGON_RPC_URL else "Demo Synthetic Provider Active"
        }
    }

@router.get("/audit-logs")
def get_audit_logs(limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(require_role(["ADMIN"]))):
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit).all()

@router.get("/users")
def get_users(db: Session = Depends(get_db), current_user: User = Depends(require_role(["ADMIN"]))):
    return db.query(User).all()
