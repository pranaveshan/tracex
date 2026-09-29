from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.database.models import User
from app.blockchain.factory import get_blockchain_provider
from app.risk.risk_engine import ExplainableRiskEngine
from app.analytics.pattern_detector import PatternDetector
from app.auth.dependencies import get_current_user, log_audit
from app.schemas import WalletAnalysisRequest

router = APIRouter(prefix="/wallets", tags=["Wallet Intelligence"])

@router.post("/analyze")
def analyze_wallet(payload: WalletAnalysisRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    address = payload.address.strip()
    network = payload.network or "Ethereum"
    provider = get_blockchain_provider(network)

    overview = provider.get_wallet_overview(address, network)
    transactions = provider.get_transactions(address, network)
    token_transfers = provider.get_token_transfers(address, network)
    counterparties = provider.get_counterparties(address, network)
    risk_data = ExplainableRiskEngine.calculate_risk(address, network)
    patterns = PatternDetector.analyze_patterns(transactions, address)

    log_audit(db, current_user, "ANALYZE_WALLET", "Wallet", address, {"network": network, "risk_score": risk_data["risk_score"]})

    return {
        "overview": overview,
        "risk_assessment": risk_data,
        "patterns_detected": patterns,
        "transactions_sample": transactions[:10],
        "token_transfers": token_transfers,
        "counterparties_sample": counterparties,
        "provider_mode": provider.provider_mode
    }

@router.get("/{address}")
def get_wallet_info(address: str, network: str = "Ethereum", db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    provider = get_blockchain_provider(network)
    overview = provider.get_wallet_overview(address, network)
    risk_data = ExplainableRiskEngine.calculate_risk(address, network)
    return {
        "overview": overview,
        "risk_assessment": risk_data,
        "provider_mode": provider.provider_mode
    }

@router.get("/{address}/transactions")
def get_wallet_txs(address: str, network: str = "Ethereum", limit: int = 50, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    provider = get_blockchain_provider(network)
    txs = provider.get_transactions(address, network, limit)
    return {"address": address, "network": network, "count": len(txs), "transactions": txs}
