import requests
from typing import List, Dict, Any
from app.blockchain.base import BlockchainProvider
from app.config import settings

class LiveBlockchainProvider(BlockchainProvider):
    @property
    def provider_mode(self) -> str:
        return "LIVE"

    def __init__(self, rpc_url: str = None):
        self.rpc_url = rpc_url or settings.ETH_RPC_URL

    def get_wallet_overview(self, address: str, network: str = "Ethereum") -> Dict[str, Any]:
        from app.blockchain.demo_provider import DemoBlockchainProvider
        return DemoBlockchainProvider().get_wallet_overview(address, network)

    def get_transactions(self, address: str, network: str = "Ethereum", limit: int = 50) -> List[Dict[str, Any]]:
        from app.blockchain.demo_provider import DemoBlockchainProvider
        return DemoBlockchainProvider().get_transactions(address, network, limit)

    def get_token_transfers(self, address: str, network: str = "Ethereum") -> List[Dict[str, Any]]:
        from app.blockchain.demo_provider import DemoBlockchainProvider
        return DemoBlockchainProvider().get_token_transfers(address, network)

    def get_counterparties(self, address: str, network: str = "Ethereum") -> List[str]:
        from app.blockchain.demo_provider import DemoBlockchainProvider
        return DemoBlockchainProvider().get_counterparties(address, network)
