from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BlockchainProvider(ABC):
    @abstractmethod
    def get_wallet_overview(self, address: str, network: str = "Ethereum") -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_transactions(self, address: str, network: str = "Ethereum", limit: int = 50) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_token_transfers(self, address: str, network: str = "Ethereum") -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_counterparties(self, address: str, network: str = "Ethereum") -> List[str]:
        pass

    @property
    @abstractmethod
    def provider_mode(self) -> str:
        pass
