from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import Alert, User
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("")
def get_alerts(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Alert).order_by(Alert.timestamp.desc()).all()

@router.post("/{alert_id}/acknowledge")
def ack_alert(alert_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if alert:
        alert.is_acknowledged = True
        db.commit()
    return {"status": "success"}
