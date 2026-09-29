from fastapi import APIRouter, Depends
from app.auth.dependencies import get_current_user
from app.database.models import User

router = APIRouter(prefix="/cross-chain", tags=["Cross-Chain Analysis"])

@router.get("/{address}")
def get_cross_chain_movements(address: str, current_user: User = Depends(get_current_user)):
    return {
        "address": address,
        "cross_chain_events": [
            {
                "event_id": "XC-89102",
                "origin_chain": "Ethereum",
                "destination_chain": "BNB Chain",
                "bridge_name": "Stargate Finance",
                "asset": "ETH / WETH",
                "amount": 24.5,
                "amount_usd": 80850.0,
                "origin_tx": "0x9f59182739481729384719283749182739481729384719283749182739481731",
                "dest_tx": "0xbb10293847192837491827394817293847192837491827394817293847192837",
                "sender": "0x89205a3e3b2a69de6dbf7f01ed13b2108b2c43e7",
                "recipient": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                "timestamp": "2026-09-22T14:32:00Z",
                "confidence": 0.95,
                "status": "Finalized"
            }
        ],
        "summary": "1 cross-chain bridge transfer detected transporting 24.5 ETH (~$80,850 USD) to BNB Chain."
    }
