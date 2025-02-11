import requests
import backoff
from typing import Dict, Any
#url for name: https://world.openfoodfacts.org/cgi/search.pl?search_terms=<search_term>&action=process&json=true - free text search
#other url for name:   https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chocolate&json=1 - free text search
#other url for name: GET https://world.openfoodfacts.org/api/v2/search?categories_tags_en=chocolates&fields=code,product_name - not free text search but can be used to get specific categories/fields
#url for barcode: https://world.openfoodfacts.org/api/v2/product/<barcode>.json
#other option: https://world.openfoodfacts.org/api/v0/product/<barcode>.json
#example of barcode: 7290004127800 - milk

class BarcodeApiClient(requests.Session):
    def __init__(self, api_key: str):
        super().__init__()
        self.api_key = api_key
        self.base_url = "https://world.openfoodfacts.org"

    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    def get_product_by_name(self, name: str) -> Dict[str, Any]:
        """
        Get product information by name with automatic retry on failure.
        
        Args:
            name: Product name to search for
            
        Returns:
            Dict containing product information
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        url = f"{self.base_url}/cgi/search.pl"
        params = {
            "search_terms": name,
            "action": "process",
            "json": "true"
        }
        response = self.get(url, params=params)
        response.raise_for_status()
        return response.json()

    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    def get_product_by_barcode(self, barcode: str) -> Dict[str, Any]:
        """
        Get product information by barcode with automatic retry on failure.
        
        Args:
            barcode: Product barcode to look up
            
        Returns:
            Dict containing product information
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        url = f"{self.base_url}/api/v0/product/{barcode}.json"
        response = self.get(url)
        response.raise_for_status()
        return response.json()

