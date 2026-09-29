from fastapi import APIRouter, Depends
from app.analytics.cluster_engine import ClusterEngine
from app.auth.dependencies import get_current_user
from app.database.models import User

router = APIRouter(prefix="/clusters", tags=["Wallet Clusters"])

@router.get("/{cluster_id}")
def get_cluster(cluster_id: str, current_user: User = Depends(get_current_user)):
    return ClusterEngine.get_cluster_details(cluster_id)

@router.get("")
def list_clusters(current_user: User = Depends(get_current_user)):
    return [
        ClusterEngine.get_cluster_details("CL-1028"),
        {
            "cluster_id": "CL-2045",
            "cluster_name": "Phishing Syndicate Beta",
            "wallet_count": 8,
            "total_volume_usd": 420000.0,
            "primary_network": "Polygon / Ethereum",
            "probable_service": "Kraken (Demo Entity)",
            "confidence_score": 0.81
        },
        {
            "cluster_id": "CL-MIX-01",
            "cluster_name": "Tornado Privacy Liquidity Pool",
            "wallet_count": 142,
            "total_volume_usd": 12500000.0,
            "primary_network": "Ethereum",
            "probable_service": "Mixer Contract",
            "confidence_score": 0.99
        }
    ]
