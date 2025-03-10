from app.infrastructures.external_apis.barcode_api_client import BarcodeApiClient
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface

class ProductsFetchingService:
    def __init__(self, users_repo: UserRepositoryInterface):
        self.users_repository = users_repo

    def get_product_by_barcode(self, barcode: str):
        barcode_api_client = BarcodeApiClient()
        product = barcode_api_client.get_product_by_barcode(barcode)
        return product
    
    def get_products_by_name(self, name: str, page: int):
        barcode_api_client = BarcodeApiClient()
        products = barcode_api_client.get_products_by_name(name, page)
        return products
        
    def get_products_by_category(self, category: str, page: int):
        barcode_api_client = BarcodeApiClient()
        products = barcode_api_client.get_products_by_category(category, page)
        return products 
    
    
