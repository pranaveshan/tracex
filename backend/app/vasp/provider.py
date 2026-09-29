from typing import List, Dict, Any, Optional
from app.vasp.base import VASPProvider

class DemoVASPProvider(VASPProvider):
    def __init__(self):
        self.vasps = [
            {
                "id": 1,
                "name": "Binance (Demo Entity)",
                "vasp_type": "Centralized Exchange",
                "jurisdiction": "Global / Multi-jurisdictional",
                "compliance_email": "case-response@binance-demo.int",
                "subpoena_portal_url": "https://le-portal.binance-demo.int",
                "confidence_rating": 0.96,
                "supported_chains": ["Ethereum", "BNB Chain", "Polygon", "Bitcoin", "Solana"],
                "source": "DEMO_INTELLIGENCE",
                "status": "Active",
                "description": "High-volume international exchange omnibus and deposit architecture."
            },
            {
                "id": 2,
                "name": "Coinbase (Demo Entity)",
                "vasp_type": "Centralized Exchange",
                "jurisdiction": "United States (FinCEN Registered)",
                "compliance_email": "lawenforcement@coinbase-demo.int",
                "subpoena_portal_url": "https://compliance.coinbase-demo.int",
                "confidence_rating": 0.98,
                "supported_chains": ["Ethereum", "Polygon", "Bitcoin", "Base"],
                "source": "DEMO_INTELLIGENCE",
                "status": "Active",
                "description": "US-regulated cryptocurrency exchange with automated law enforcement request system."
            },
            {
                "id": 3,
                "name": "Kraken (Demo Entity)",
                "vasp_type": "Centralized Exchange",
                "jurisdiction": "United States / EU",
                "compliance_email": "compliance@kraken-demo.int",
                "subpoena_portal_url": "https://le.kraken-demo.int",
                "confidence_rating": 0.95,
                "supported_chains": ["Ethereum", "Bitcoin", "Polygon"],
                "source": "DEMO_INTELLIGENCE",
                "status": "Active",
                "description": "Global exchange with established law-enforcement liaison desk."
            },
            {
                "id": 4,
                "name": "Tornado Cash (Demo Entity)",
                "vasp_type": "Mixer",
                "jurisdiction": "Decentralized / Non-Custodial (OFAC Designated)",
                "compliance_email": "N/A (Decentralized Protocol)",
                "subpoena_portal_url": "N/A",
                "confidence_rating": 0.99,
                "supported_chains": ["Ethereum", "BNB Chain", "Polygon"],
                "source": "DEMO_INTELLIGENCE",
                "status": "Flagged / Sanctioned",
                "description": "Smart-contract zero-knowledge anonymity pool."
            },
            {
                "id": 5,
                "name": "Stargate Finance (Demo Entity)",
                "vasp_type": "Bridge",
                "jurisdiction": "Decentralized Liquidity Network",
                "compliance_email": "security@stargate-demo.int",
                "subpoena_portal_url": "https://stargate-demo.int/security",
                "confidence_rating": 0.92,
                "supported_chains": ["Ethereum", "BNB Chain", "Polygon", "Avalanche", "Arbitrum"],
                "source": "DEMO_INTELLIGENCE",
                "status": "Active",
                "description": "Cross-chain liquidity transport protocol enabling asset movement across EVM chains."
            }
        ]

    def identify_wallet(self, address: str, network: str = "Ethereum") -> Optional[Dict[str, Any]]:
        addr = address.lower()
        if addr == "0x28c6c06298d514db089934071355e5743bf21d60":
            return {
                "vasp": self.vasps[0],
                "wallet_role": "Deposit Sweep Transit Wallet",
                "confidence": 0.94,
                "evidence": "Matches Binance deposit proxy contract bytecode and sweeper pattern."
            }
        elif addr == "0x21a31ee1afc51d94c2efccaa2092ad1028285549":
            return {
                "vasp": self.vasps[0],
                "wallet_role": "Exchange Hot Wallet 6",
                "confidence": 0.99,
                "evidence": "High-velocity consolidation omnibus address with multi-signature governance."
            }
        elif addr == "0x8589427373d6d84e98730d7795d8f6f8731fda16":
            return {
                "vasp": self.vasps[3],
                "wallet_role": "Mixer Pool Contract",
                "confidence": 0.99,
                "evidence": "Zero-knowledge note verification contract."
            }
        elif addr == "0xd8da6bf26964af9d7eed9e03e53415d37aa96045":
            return {
                "vasp": self.vasps[4],
                "wallet_role": "Cross-Chain Bridge Router",
                "confidence": 0.95,
                "evidence": "LayerZero cross-chain message endpoint."
            }
        return None

    def get_all_vasps(self) -> List[Dict[str, Any]]:
        return self.vasps
