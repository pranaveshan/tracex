from app.config import settings
from app.blockchain.base import BlockchainProvider
from app.blockchain.demo_provider import DemoBlockchainProvider
from app.blockchain.live_provider import LiveBlockchainProvider

def get_blockchain_provider(network: str = "Ethereum") -> BlockchainProvider:
    if settings.BLOCKCHAIN_MODE.lower() == "live" and settings.ETH_RPC_URL:
        return LiveBlockchainProvider()
    return DemoBlockchainProvider()
