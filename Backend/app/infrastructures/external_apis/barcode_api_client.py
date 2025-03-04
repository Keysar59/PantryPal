import requests
import backoff
from typing import Dict, Any, List
from app.domain.entities.product import json_to_product, json_to_product_list, Product, full_json_to_product
#url for name: https://world.openfoodfacts.org/cgi/search.pl?search_terms=<search_term>&action=process&json=true - free text search
#other url for name: https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chocolate&json=1 - free text search

#other url for name: https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chocolate&json=1&fields=product_name,code,image_url


#url for categories and only categories: https://world.openfoodfacts.org/api/v2/search?categories_tags_en=chocolates&fields=code,product_name - not free text search but can be used to get specific categories/fields

#url for barcode: https://world.openfoodfacts.org/api/v2/product/<barcode>.json
#other option: https://world.openfoodfacts.org/api/v0/product/<barcode>.json
#example of barcode: 7290004127800 - milk
BASE_URL = "https://world.openfoodfacts.org"
class BarcodeApiClient(requests.Session):
    def __init__(self):
        super().__init__()
        
        
    def build_base_params(self, page: int = 1):
        base_params = {
            "page": page,
            "page_size": 10
        }
        fields = ["product_name", "product_name_en", "code", "image_url"]
        if fields:
            base_params["fields"] = ",".join(fields)
        return base_params
        
        
    
    
    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    def get_products_by_name(self, name: str, page: int = 1) -> List[Product]:
        """
        Get product information by name with automatic retry on failure.
        
        Args:
            name: Product name to search for
            base_params: Dictionary containing filtering parameters
            
        Returns:
            Dict containing product information
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        try:
            url = f"{BASE_URL}/cgi/search.pl"
            params = {
                "search_terms": name,
                "action": "process",
                "json": "true",
                **self.build_base_params(page)
            }
    
            response = self.get(url, params=params)
            response.raise_for_status()
            return json_to_product_list(response.json())
        except requests.HTTPError as e:
            print(f"no products found for name or part of the name: {name}")
            return []

    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    def get_product_by_barcode(self, barcode: str) -> Product:
        """
        Get product information by barcode with automatic retry on failure.
        
        Args:
            barcode: Product barcode to look up
            
        Returns:
            Dict containing product information
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        try:
            url = f"{BASE_URL}/api/v2/product/{barcode}.json"
            params = {
               **self.build_base_params(),
            }
            response = self.get(url, params=params)
            response.raise_for_status()
            return full_json_to_product(response.json())
        except requests.HTTPError as e: 
            print(f"no product found for barcode: {barcode}")
            return None

    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    def get_products_by_category(self, category: str, page: int = 1) -> List[Product]:
        """
        Get products by category with automatic retry on failure.
        
        Args:
            category: Category to search for (in English)
            page: Page number to retrieve 
        Returns:
            Dict containing product information 
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        try:
            url = f"{BASE_URL}/api/v2/search"
            params = {
                "categories_tags_en": category,
                "json": "true",
                **self.build_base_params(page)
            }
            
                
            response = self.get(url, params=params)
            response.raise_for_status()            
            return json_to_product_list(response.json())
        except requests.HTTPError as e:
            print(f"no products found for category: {category}")
            return []

