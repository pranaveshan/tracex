from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import Case, Alert, User
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/search", tags=["Global Intelligence Search"])

@router.get("")
def global_search(q: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    query = q.strip()
    cases = db.query(Case).filter(
        (Case.case_id.ilike(f"%{query}%")) |
        (Case.primary_wallet.ilike(f"%{query}%")) |
        (Case.title.ilike(f"%{query}%"))
    ).all()
    
    alerts = db.query(Alert).filter(
        (Alert.wallet_address.ilike(f"%{query}%")) |
        (Alert.title.ilike(f"%{query}%"))
    ).all()

    return {
        "query": query,
        "cases": [{"id": c.id, "case_id": c.case_id, "title": c.title, "wallet": c.primary_wallet, "status": c.status} for c in cases],
        "alerts": [{"id": a.id, "title": a.title, "wallet": a.wallet_address, "severity": a.severity} for a in alerts],
        "clusters": [{"cluster_id": "CL-1028", "name": "Laundering Syndicate Alpha", "wallets": 17}] if "1028" in query or "0x71c" in query.lower() else [],
        "vasps": [{"name": "Binance (Demo Entity)", "type": "Centralized Exchange"}] if "binance" in query.lower() or "exchange" in query.lower() else []
    }
