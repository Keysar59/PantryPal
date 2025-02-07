import requests
from typing import Optional, Dict, Any
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

class WebsiteScraper:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(WebsiteScraper, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._url = "https://chp.co.il/autocompletion/product_extended?term="
            self._session = requests.Session()
            self._headers = {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'connection': 'keep-alive',
                'cookie': 'us=0.49045152705649_1738913029; u=0.06622419266865598; _ga=GA1.3.2045586979.1738913031; _gid=GA1.3.398668545.1738913031; _gat=1',
                'host': 'chp.co.il',
                'referer': 'https://chp.co.il/main_page/',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest'
            }
            #'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            self._initialized = True

    def fetch_data(self, barcode: str) -> Optional[Dict[str, Any]]:
        """
        Fetches data from the website with the barcode - at the moment it only works with the barcode
        
        Args:
            url: The URL to fetch data from
            
        Returns:
            Parsed JSON response or None if request fails
        """
        try:
            response = self._session.get(self._url + barcode, headers=self._headers)
            response.raise_for_status()
            return response.json()
        except (requests.RequestException, json.JSONDecodeError) as e:
            print(f"Error fetching data: {str(e)}")
            return None

    def parse_product_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses the product data from the response
        
        Args:
            data: Raw JSON response from the API
            
        Returns:
            Parsed product information
        """
        if not data or not isinstance(data, list) or len(data) == 0:
            return {}
            
        try:
            product = data[0]
            parsed_data = {
                'name': product['value'],
                'label': product['label'],
                'id': product['id'],
                'name_and_contents': product['parts']['name_and_contents'],
                'manufacturer_and_barcode': product['parts']['manufacturer_and_barcode'],
                'pack_size': product['parts']['pack_size'],
                'small_image': product['parts']['small_image'],
            }
            return parsed_data
        except Exception as e:
            print(f"Error parsing data: {str(e)}")
            return {}

scraper = WebsiteScraper()
data = scraper.fetch_data("7290004127800")
parsed_data = scraper.parse_product_data(data)
print(json.dumps(parsed_data, ensure_ascii=False, indent=2))
