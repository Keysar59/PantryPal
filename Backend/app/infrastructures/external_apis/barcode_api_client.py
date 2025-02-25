import requests
import backoff
from typing import Dict, Any
import functools
import inspect
#url for name: https://world.openfoodfacts.org/cgi/search.pl?search_terms=<search_term>&action=process&json=true - free text search
#other url for name: https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chocolate&json=1 - free text search

#other url for name: https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=chocolate&json=1&fields=product_name,code,image_url


#url for categories and only categories: https://world.openfoodfacts.org/api/v2/search?categories_tags_en=chocolates&fields=code,product_name - not free text search but can be used to get specific categories/fields

#url for barcode: https://world.openfoodfacts.org/api/v2/product/<barcode>.json
#other option: https://world.openfoodfacts.org/api/v0/product/<barcode>.json
#example of barcode: 7290004127800 - milk

class BarcodeApiClient(requests.Session):
    def __init__(self):
        super().__init__()
        self.base_url = "https://world.openfoodfacts.org"
        
    def api_call_wrapper(func):
        @functools.wraps(func)
        def wrapper(self, *args, **kwargs):
            page = kwargs.pop("page", 1)
            base_params = {
                "page": page,
                "page_size": 10
            }
            fields = ["product_name", "product_name_en", "code", "image_url"]
            if fields:
                base_params["fields"] = ",".join(fields)
            return_value = func(self, *args, _base_params=base_params, **kwargs)
            #convert product json list to list of objects
            return return_value
        
        return wrapper
    
    
    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    @api_call_wrapper
    def get_product_by_name(self, name: str, _base_params: Dict[str, Any]) -> Dict[str, Any]:
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
        url = f"{self.base_url}/cgi/search.pl"
        params = {
            "search_terms": name,
            "action": "process",
            "json": "true",
            **_base_params  # Merge base_params last to preserve pagination and fields
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
        try:
            url = f"{self.base_url}/api/v2/product/{barcode}.json"
            response = self.get(url)
            response.raise_for_status()
            return response.json()
        except requests.HTTPError as e: 
            return response.json()
            

    @backoff.on_exception(
        backoff.expo,
        (requests.exceptions.RequestException, requests.exceptions.HTTPError),
        max_tries=5,
        giveup=lambda e: isinstance(e, requests.exceptions.HTTPError) and e.response.status_code not in [429, 500, 502, 503, 504]
    )
    @api_call_wrapper
    def get_products_by_category(self, category: str, _base_params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Get products by category with automatic retry on failure.
        
        Args:
            category: Category to search for (in English)
            base_params: Dictionary containing filtering parameters
        Returns:
            Dict containing product information 
            
        Raises:
            requests.exceptions.RequestException: If the request fails after all retries
        """
        try:
            url = f"{self.base_url}/api/v2/search"
            params = {
                "categories_tags_en": category,
                "json": "true",
                **_base_params
            }
            
                
            response = self.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.HTTPError as e:
            return response.json()

