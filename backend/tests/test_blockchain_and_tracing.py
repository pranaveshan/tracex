import pytest
from app.blockchain.demo_provider import DemoBlockchainProvider
from app.analytics.tracer import FundFlowTracer
from app.analytics.pattern_detector import PatternDetector

def test_demo_blockchain_provider():
    provider = DemoBlockchainProvider()
    overview = provider.get_wallet_overview("0x71c8491c39049a46399b009e51b14798380ad7f4")
    assert overview["risk_score"] >= 80
    assert overview["risk_level"] == "CRITICAL"
    assert overview["total_transactions"] > 0

    txs = provider.get_transactions("0x71c8491c39049a46399b009e51b14798380ad7f4")
    assert len(txs) >= 5

def test_fund_flow_tracer():
    tracer = FundFlowTracer(network="Ethereum")
    data = tracer.trace("0x71c8491c39049a46399b009e51b14798380ad7f4")
    assert data["total_nodes"] >= 5
    assert data["total_edges"] >= 5
    assert "vasp_exposure" in data
    assert data["vasp_exposure"]["confidence_score"] >= 0.85

def test_pattern_detection():
    provider = DemoBlockchainProvider()
    txs = provider.get_transactions("0x71c8491c39049a46399b009e51b14798380ad7f4")
    patterns = PatternDetector.analyze_patterns(txs, "0x71c8491c39049a46399b009e51b14798380ad7f4")
    types = [p["type"] for p in patterns]
    assert "MIXER_EXPOSURE" in types
    assert "CROSS_CHAIN_TRANSFER" in types
