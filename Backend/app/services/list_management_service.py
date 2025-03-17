from app.domain.entities.products_list import ProductsList
from app.domain.entities.product import Product
from app.domain.repositories_interfaces.products_list_repository_interface import ProductsListRepositoryInterface

class ListManagementService:

    def __init__(self, product_list_repository: ProductsListRepositoryInterface):
        self.product_list_repository = product_list_repository


    def add_product_to_list(self, list_id: int, product: Product, quantity: int) -> bool:
        return self.product_list_repository.add_product_to_list(list_id, product, quantity)


    def add_list_of_products_to_list(self, list_id: int, products_to_add: list[tuple[Product, int]]) -> bool:
        for product, quantity in products_to_add:
            success = self.add_product_to_list(list_id, product, quantity)
            if not success:
                return False
        return True


    def remove_product_from_list(self, list_id: int, product_id: str, quantity: int) -> bool:
        products_in_list = self.get_products_from_list(list_id)

        for product_in_list in products_in_list:
            if product_in_list[0] == product_id:
                if product_in_list[3] >= quantity:
                    return self.product_list_repository.remove_product_from_list(list_id, product_id, quantity)

        return False
        


    def remove_list_of_products_from_list(self, list_id: int, products_to_remove: list[tuple[str, int]]) -> bool:
        for product in products_to_remove:
            success = self.remove_product_from_list(list_id, product[0], product[1])
            if not success:
                return False

        return True


    def get_products_from_list(self, list_id: int) -> list[Product, int]:
        return self.product_list_repository.get_products_from_list(list_id)
