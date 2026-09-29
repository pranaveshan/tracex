from typing import List, Dict, Any
from app.blockchain.factory import get_blockchain_provider

class FundFlowTracer:
    def __init__(self, network: str = "Ethereum"):
        self.provider = get_blockchain_provider(network)

    def trace(self, start_address: str, direction: str = "forward", max_hops: int = 5, min_amount: float = 0.0) -> Dict[str, Any]:
        txs = self.provider.get_transactions(start_address)
        nodes_dict = {}
        edges = []
        
        start_info = self.provider.get_wallet_overview(start_address)
        nodes_dict[start_address.lower()] = {
            "id": start_address.lower(),
            "address": start_address,
            "label": start_info.get("label", "Reported Wallet"),
            "entity_type": "Reported Suspect",
            "risk_score": start_info.get("risk_score", 85),
            "risk_level": start_info.get("risk_level", "HIGH"),
            "hop": 0,
            "balance": start_info.get("current_balance_native", 0.0),
            "network": start_info.get("network", "Ethereum"),
            "cluster_id": start_info.get("cluster_id", "CL-1028")
        }

        hop = 1
        for tx in txs:
            if tx.get("amount_native", 0.0) < min_amount:
                continue

            src = tx["from_address"].lower()
            dst = tx["to_address"].lower()

            if src not in nodes_dict:
                src_info = self.provider.get_wallet_overview(tx["from_address"])
                nodes_dict[src] = {
                    "id": src,
                    "address": tx["from_address"],
                    "label": src_info.get("label", "Source Wallet"),
                    "entity_type": "Victim / Origin" if src != start_address.lower() else "Reported Suspect",
                    "risk_score": src_info.get("risk_score", 20),
                    "risk_level": src_info.get("risk_level", "LOW"),
                    "hop": -1 if direction == "backward" else 1,
                    "balance": src_info.get("current_balance_native", 0.0),
                    "network": tx.get("network", "Ethereum"),
                    "cluster_id": src_info.get("cluster_id")
                }

            if dst not in nodes_dict:
                dst_info = self.provider.get_wallet_overview(tx["to_address"])
                etype = dst_info.get("entity_type", "Intermediary Wallet")
                if "mixer" in dst_info.get("label", "").lower() or "0x8589427" in dst:
                    etype = "Mixer / Tumbler"
                elif "bridge" in tx.get("patterns", []) or tx.get("is_cross_chain"):
                    etype = "Cross-Chain Bridge"
                elif "exchange" in dst_info.get("label", "").lower() or "deposit" in str(tx.get("patterns", "")).lower():
                    etype = "Exchange Deposit"
                elif "storage" in dst_info.get("label", "").lower() or "vasp" in dst_info.get("label", "").lower():
                    etype = "VASP Hot/Cold Storage"

                nodes_dict[dst] = {
                    "id": dst,
                    "address": tx["to_address"],
                    "label": dst_info.get("label", f"Intermediary Node {len(nodes_dict)}"),
                    "entity_type": etype,
                    "risk_score": dst_info.get("risk_score", 65),
                    "risk_level": dst_info.get("risk_level", "MEDIUM"),
                    "hop": hop,
                    "balance": dst_info.get("current_balance_native", 0.0),
                    "network": tx.get("dest_chain") if tx.get("is_cross_chain") else tx.get("network", "Ethereum"),
                    "cluster_id": dst_info.get("cluster_id")
                }
                hop += 1

            edges.append({
                "id": f"e-{tx['tx_hash'][:10]}",
                "source": src,
                "target": dst,
                "tx_hash": tx["tx_hash"],
                "asset": tx.get("asset_symbol", "ETH"),
                "amount": tx.get("amount_native", 0.0),
                "amount_usd": tx.get("amount_usd", 0.0),
                "timestamp": tx.get("timestamp"),
                "is_cross_chain": tx.get("is_cross_chain", False),
                "bridge_name": tx.get("bridge_name"),
                "patterns": tx.get("patterns", [])
            })

        vasp_exposure = {
            "vasp_name": "Demo Global Exchange (Binance/Bybit Synthetic Cluster)",
            "vasp_type": "Centralized Exchange",
            "jurisdiction": "Cayman Islands / Global Operations",
            "wallet_address": "0x28C6c06298d514Db089934071355E5743bf21d60",
            "hop_count": 3,
            "amount_transferred": 51.5,
            "timestamp": txs[-2]["timestamp"] if len(txs) >= 2 else txs[0]["timestamp"],
            "tx_hash": "0x0a69182739481729384719283749182739481729384719283749182739481732",
            "confidence_score": 0.91,
            "reasons": [
                "Wallet cluster matches known deposit-sweeper architecture",
                "Rapid pass-through to internal hot-wallet 0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549",
                "Transaction timing aligns with systematic liquidation cycle",
                "High counterparty fan-in pattern typical of centralized exchange omnibus accounts"
            ],
            "compliance_contact": "subpoena-compliance@exchange-demo.int / LE Portal"
        }

        return {
            "root_address": start_address,
            "direction": direction,
            "total_nodes": len(nodes_dict),
            "total_edges": len(edges),
            "nodes": list(nodes_dict.values()),
            "edges": edges,
            "vasp_exposure": vasp_exposure
        }
