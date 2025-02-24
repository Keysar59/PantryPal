from app.infrastructures.external_apis.barcode_api_client import BarcodeApiClient
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface

class TestingService:
    def __init__(self, users_repo: UserRepositoryInterface):
        self.users_repository = users_repo

    def get_product_by_barcode(self, barcode: str):
        barcode_api_client = BarcodeApiClient()
        product = barcode_api_client.get_product_by_barcode(barcode)
        return product
    
    def get_users_data(self):
        data = self.users_repository.get_data()
        print("data1.5", data)
        return data
