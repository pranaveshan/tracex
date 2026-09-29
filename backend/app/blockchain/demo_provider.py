import datetime
from typing import List, Dict, Any
from app.blockchain.base import BlockchainProvider

class DemoBlockchainProvider(BlockchainProvider):
    @property
    def provider_mode(self) -> str:
        return "DEMO"

    def __init__(self):
        self.now = datetime.datetime.utcnow()
        self.suspect_wallet = "0x71c8491c39049a46399b009e51b14798380ad7f4"
        self.victim_wallet = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be"
        self.inter_wallet_a = "0x89205a3e3b2a69de6dbf7f01ed13b2108b2c43e7"
        self.inter_wallet_b = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
        self.mixer_wallet = "0x8589427373D6D84E98730D7795D8f6f8731FDA16"
        self.bridge_wallet = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
        self.dest_bsc_wallet = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        self.exchange_deposit = "0x28C6c06298d514Db089934071355E5743bf21d60"
        self.vasp_hot_wallet = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549"

    def get_wallet_overview(self, address: str, network: str = "Ethereum") -> Dict[str, Any]:
        addr = address.lower()
        if addr == self.suspect_wallet.lower():
            return {
                "address": address,
                "network": network,
                "entity_type": "Suspect Wallet",
                "label": "Primary Suspect - CYB-2026-00421",
                "first_seen": (self.now - datetime.timedelta(days=14)).isoformat(),
                "last_active": (self.now - datetime.timedelta(hours=2)).isoformat(),
                "total_transactions": 28,
                "incoming_count": 12,
                "outgoing_count": 16,
                "total_received_native": 145.85,
                "total_sent_native": 143.20,
                "total_received_usd": 481305.00,
                "total_sent_usd": 472560.00,
                "current_balance_native": 2.65,
                "counterparty_count": 19,
                "risk_score": 92,
                "risk_level": "CRITICAL",
                "cluster_id": "CL-1028",
                "is_flagged": True,
                "tags": ["Investment Scam", "Rapid Movement", "Peel Chain", "Mixer Interaction", "Cross-Chain Exposure"]
            }
        elif "mixer" in addr or addr == self.mixer_wallet.lower():
            return {
                "address": address,
                "network": network,
                "entity_type": "Mixer / Tumbler",
                "label": "Demo Privacy Mixer Contract",
                "first_seen": (self.now - datetime.timedelta(days=400)).isoformat(),
                "last_active": self.now.isoformat(),
                "total_transactions": 54200,
                "incoming_count": 27100,
                "outgoing_count": 27100,
                "total_received_native": 350000.0,
                "total_sent_native": 349800.0,
                "total_received_usd": 1155000000.0,
                "total_sent_usd": 1154340000.0,
                "current_balance_native": 200.0,
                "counterparty_count": 18200,
                "risk_score": 98,
                "risk_level": "CRITICAL",
                "cluster_id": "CL-MIX-01",
                "is_flagged": True,
                "tags": ["Anonymity Service", "Sanction Risk", "High Velocity"]
            }
        elif "exchange" in addr or addr == self.exchange_deposit.lower() or addr == self.vasp_hot_wallet.lower():
            return {
                "address": address,
                "network": network,
                "entity_type": "Exchange Deposit Wallet",
                "label": "Demo Global Exchange Deposit Sweeper",
                "first_seen": (self.now - datetime.timedelta(days=90)).isoformat(),
                "last_active": self.now.isoformat(),
                "total_transactions": 3890,
                "incoming_count": 3800,
                "outgoing_count": 90,
                "total_received_native": 12400.5,
                "total_sent_native": 12380.0,
                "total_received_usd": 40920000.0,
                "total_sent_usd": 40854000.0,
                "current_balance_native": 20.5,
                "counterparty_count": 3600,
                "risk_score": 25,
                "risk_level": "LOW",
                "cluster_id": "CL-VASP-BINANCE-DEMO",
                "is_flagged": False,
                "tags": ["VASP Associated", "Deposit Sweep Pattern"]
            }
        else:
            h = sum(ord(c) for c in address)
            tx_cnt = (h % 35) + 4
            rec_eth = float((h % 80) + 5.25)
            sent_eth = rec_eth * 0.92
            risk = (h % 65) + 20
            r_level = "CRITICAL" if risk >= 80 else ("HIGH" if risk >= 60 else ("MEDIUM" if risk >= 35 else "LOW"))
            return {
                "address": address,
                "network": network,
                "entity_type": "Intermediary Wallet" if risk > 50 else "Unknown Wallet",
                "label": f"Intermediary Node #{h % 999}",
                "first_seen": (self.now - datetime.timedelta(days=(h % 60) + 5)).isoformat(),
                "last_active": (self.now - datetime.timedelta(hours=(h % 48) + 1)).isoformat(),
                "total_transactions": tx_cnt,
                "incoming_count": tx_cnt // 2 + 1,
                "outgoing_count": tx_cnt // 2,
                "total_received_native": round(rec_eth, 4),
                "total_sent_native": round(sent_eth, 4),
                "total_received_usd": round(rec_eth * 3300.0, 2),
                "total_sent_usd": round(sent_eth * 3300.0, 2),
                "current_balance_native": round(rec_eth - sent_eth, 4),
                "counterparty_count": max(2, tx_cnt - 2),
                "risk_score": risk,
                "risk_level": r_level,
                "cluster_id": f"CL-{(h % 500) + 1000}",
                "is_flagged": risk >= 70,
                "tags": ["Intermediary Hop", "Recent Activity"] if risk > 50 else ["Normal Activity"]
            }

    def get_transactions(self, address: str, network: str = "Ethereum", limit: int = 50) -> List[Dict[str, Any]]:
        return [
            {
                "tx_hash": "0x4a9f3b1187429188e9912048cd378912ef39148721934812a01d9f4820ab1849",
                "network": "Ethereum",
                "from_address": self.victim_wallet,
                "to_address": self.suspect_wallet,
                "asset_symbol": "ETH",
                "amount_native": 45.0,
                "amount_usd": 148500.0,
                "timestamp": (self.now - datetime.timedelta(days=12, hours=4)).isoformat(),
                "block_number": 19482010,
                "fee_usd": 8.50,
                "is_cross_chain": False,
                "patterns": ["Victim Fraud Inflow", "High Value Transfer"]
            },
            {
                "tx_hash": "0x5b102948712398418abdf2938471928374829104829384719283749283749283",
                "network": "Ethereum",
                "from_address": "0x1234567890123456789012345678901234567890",
                "to_address": self.suspect_wallet,
                "asset_symbol": "ETH",
                "amount_native": 60.0,
                "amount_usd": 198000.0,
                "timestamp": (self.now - datetime.timedelta(days=11, hours=2)).isoformat(),
                "block_number": 19483500,
                "fee_usd": 9.20,
                "is_cross_chain": False,
                "patterns": ["Victim Inflow", "Fan-In Aggregation"]
            },
            {
                "tx_hash": "0x6c29184719283749182739481729384719283749182739481729384719283749",
                "network": "Ethereum",
                "from_address": self.suspect_wallet,
                "to_address": self.inter_wallet_a,
                "asset_symbol": "ETH",
                "amount_native": 50.0,
                "amount_usd": 165000.0,
                "timestamp": (self.now - datetime.timedelta(days=10, hours=1)).isoformat(),
                "block_number": 19485120,
                "fee_usd": 7.40,
                "is_cross_chain": False,
                "patterns": ["Layering Hop 1", "Rapid Fund Movement"]
            },
            {
                "tx_hash": "0x7d39182739481729384719283749182739481729384719283749182739481729",
                "network": "Ethereum",
                "from_address": self.suspect_wallet,
                "to_address": self.inter_wallet_b,
                "asset_symbol": "ETH",
                "amount_native": 52.0,
                "amount_usd": 171600.0,
                "timestamp": (self.now - datetime.timedelta(days=9, hours=8)).isoformat(),
                "block_number": 19487400,
                "fee_usd": 6.80,
                "is_cross_chain": False,
                "patterns": ["Peel Chain Branch", "Layering Hop 1"]
            },
            {
                "tx_hash": "0x8e49182739481729384719283749182739481729384719283749182739481730",
                "network": "Ethereum",
                "from_address": self.inter_wallet_a,
                "to_address": self.mixer_wallet,
                "asset_symbol": "ETH",
                "amount_native": 25.0,
                "amount_usd": 82500.0,
                "timestamp": (self.now - datetime.timedelta(days=8, hours=3)).isoformat(),
                "block_number": 19489900,
                "fee_usd": 22.50,
                "is_cross_chain": False,
                "patterns": ["Mixer Interaction", "Anonymization Hop"]
            },
            {
                "tx_hash": "0x9f59182739481729384719283749182739481729384719283749182739481731",
                "network": "Ethereum",
                "from_address": self.inter_wallet_a,
                "to_address": self.bridge_wallet,
                "asset_symbol": "ETH",
                "amount_native": 24.5,
                "amount_usd": 80850.0,
                "timestamp": (self.now - datetime.timedelta(days=7, hours=6)).isoformat(),
                "block_number": 19491200,
                "fee_usd": 18.20,
                "is_cross_chain": True,
                "bridge_name": "Stargate Bridge",
                "dest_chain": "BNB Chain",
                "dest_tx_hash": "0xbb10293847192837491827394817293847192837491827394817293847192837",
                "patterns": ["Cross-Chain Bridge Movement", "Chain Hopping"]
            },
            {
                "tx_hash": "0x0a69182739481729384719283749182739481729384719283749182739481732",
                "network": "Ethereum",
                "from_address": self.inter_wallet_b,
                "to_address": self.exchange_deposit,
                "asset_symbol": "ETH",
                "amount_native": 51.5,
                "amount_usd": 169950.0,
                "timestamp": (self.now - datetime.timedelta(days=6, hours=1)).isoformat(),
                "block_number": 19493500,
                "fee_usd": 5.10,
                "is_cross_chain": False,
                "patterns": ["Exchange Deposit Interaction", "VASP Inflow"]
            },
            {
                "tx_hash": "0x1b79182739481729384719283749182739481729384719283749182739481733",
                "network": "Ethereum",
                "from_address": self.exchange_deposit,
                "to_address": self.vasp_hot_wallet,
                "asset_symbol": "ETH",
                "amount_native": 51.49,
                "amount_usd": 169917.0,
                "timestamp": (self.now - datetime.timedelta(days=5, hours=22)).isoformat(),
                "block_number": 19494200,
                "fee_usd": 3.40,
                "is_cross_chain": False,
                "patterns": ["Internal Exchange Consolidation", "Sweep to Hot Storage"]
            }
        ]

    def get_token_transfers(self, address: str, network: str = "Ethereum") -> List[Dict[str, Any]]:
        return [
            {
                "token_symbol": "USDT",
                "token_name": "Tether USD",
                "amount": 75000.0,
                "amount_usd": 75000.0,
                "from_address": self.suspect_wallet,
                "to_address": self.inter_wallet_b,
                "timestamp": (self.now - datetime.timedelta(days=9)).isoformat()
            }
        ]

    def get_counterparties(self, address: str, network: str = "Ethereum") -> List[str]:
        return [
            self.victim_wallet,
            self.inter_wallet_a,
            self.inter_wallet_b,
            self.mixer_wallet,
            self.bridge_wallet,
            self.exchange_deposit
        ]
