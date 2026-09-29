import pytest
from app.risk.risk_engine import ExplainableRiskEngine
from app.vasp.provider import DemoVASPProvider

def test_risk_scoring_engine():
    risk = ExplainableRiskEngine.calculate_risk("0x71c8491c39049a46399b009e51b14798380ad7f4")
    assert risk["risk_score"] >= 80
    assert risk["risk_level"] in ["HIGH", "CRITICAL"]
    assert len(risk["factors"]) >= 3
    assert risk["confidence"] >= 0.80

def test_vasp_identification():
    provider = DemoVASPProvider()
    vasps = provider.get_all_vasps()
    assert len(vasps) >= 4
    match = provider.identify_wallet("0x28c6c06298d514db089934071355e5743bf21d60")
    assert match is not None
    assert "Binance" in match["vasp"]["name"]
