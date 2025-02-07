from abc import ABC, abstractmethod
from typing import Optional, Dict, Any
class DataFetchStrategy(ABC):
    @abstractmethod
    def fetch_data(self, product_id: str) -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    def parse_product_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        pass