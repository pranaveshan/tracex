from fastapi import APIRouter, Depends
from app.analytics.tracer import FundFlowTracer
from app.auth.dependencies import get_current_user
from app.database.models import User

router = APIRouter(prefix="/graph", tags=["Transaction Graph"])

@router.get("/{address}")
def get_graph(address: str, network: str = "Ethereum", current_user: User = Depends(get_current_user)):
    tracer = FundFlowTracer(network=network)
    data = tracer.trace(start_address=address)
    return data
