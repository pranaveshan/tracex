from fastapi import APIRouter, Depends
from app.vasp.provider import DemoVASPProvider
from app.auth.dependencies import get_current_user, log_audit
from app.database.models import User
from sqlalchemy.orm import Session
from app.database.session import get_db

router = APIRouter(prefix="/vasps", tags=["VASP Intelligence"])
vasp_provider = DemoVASPProvider()

@router.get("")
def list_vasps(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vasps = vasp_provider.get_all_vasps()
    log_audit(db, current_user, "VIEW_VASPS", "VASPRegistry", None)
    return vasps

@router.get("/identify/{address}")
def identify_vasp_wallet(address: str, network: str = "Ethereum", current_user: User = Depends(get_current_user)):
    match = vasp_provider.identify_wallet(address, network)
    return match or {"identified": False, "message": "Address not present in verified VASP seed signature set."}
