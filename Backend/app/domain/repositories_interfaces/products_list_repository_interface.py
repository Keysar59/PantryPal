from app.domain.entities.products_list import ProductsList
from app.domain.entities.product import Product

class ProductsListRepositoryInterface:
    def add_product_to_list(self, list_id: int, product: Product, quantity: int) -> bool:
        pass

    def add_list_of_products_to_list(self, list_id: int, products_to_add: list[Product, int]) -> bool:
        pass

    def remove_product_from_list(self, list_id: int, product: Product, quantity: int) -> bool:
        pass

    def remove_list_of_products_from_list(self, list_id: int, products_to_add: list[Product, int]) -> bool:
        pass
    
    def get_products_from_list(self, list_id: int) -> list[Product, int]:
        pass
