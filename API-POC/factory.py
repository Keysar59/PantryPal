from strategies import DataFetchStrategy
from typing import Optional, Dict, Any
from scraper import WebsiteScraper

class DataFetchStrategyFactory:
    @staticmethod
    def create_strategy(strategy_type: str, **kwargs) -> DataFetchStrategy:
        if strategy_type.lower() == "webscraper":

            return WebsiteScraper()
        #TODO: add the parser with goverment site
        else:
            raise ValueError(f"Unknown strategy type: {strategy_type}")

class ProductDataService:
    def __init__(self, fetch_strategy: DataFetchStrategy):
        self._fetch_strategy = fetch_strategy

    def set_strategy(self, fetch_strategy: DataFetchStrategy):
        self._fetch_strategy = fetch_strategy

    def get_product_data(self, product_id: str) -> Optional[Dict[str, Any]]:
        data = self._fetch_strategy.fetch_data(product_id)
        if data:
            return self._fetch_strategy.parse_product_data(data)
        return None
