from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class VASPProvider(ABC):
    @abstractmethod
    def identify_wallet(self, address: str, network: str = "Ethereum") -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    def get_all_vasps(self) -> List[Dict[str, Any]]:
        pass
