from app.domain.entities.prodcuts_list import ProductsList
from app.domain.entities.product import Product
from app.domain.repositories_interfaces.products_list_repository_interface import ProductsListRepositoryInterface

class ListManagementService:

    def __init__(self, product_list_repository: ProductsListRepositoryInterface):
        self.product_list_repository = product_list_repository


    def add_product_to_list(self, list_id: int, product: Product, quantity: int) -> bool:
        return self.product_list_repository.add_product_to_list(list_id, product, quantity)


    def add_list_of_products_to_list(self, list_id: int, products_to_add: list[Product, int]) -> bool:
        return self.product_list_repository.add_list_of_products_to_list(list_id, products_to_add)


    def remove_product_from_list(self, list_id: int, product: Product, quantity: int) -> bool:
        products_in_list = self.get_products_from_list(list_id)

        for product_and_quantity in prodcuts_in_list
            if product_and_quantity[0].product_id == product.product_id:
                if product_and_quantity[1] >= quantity:
                    return self.product_list_repository.remove_product_from_list(list_id, product, quantity)

        return false
        


    def remove_list_of_products_from_list(self, list_id: int, products_to_remove: list[Product, int]) -> bool:
        products_in_list = self.get_products_from_list(list_id)

        for product_to_remove_and_quantity in products_to_remove:
            product_found = false

            for product_and_quantity in prodcuts_in_list:
                if product_and_quantity[0].product_id == product_to_remove_and_quantity[0].product_id:

                    if product_and_quantity[1] >= product_to_remove_and_quantity[1]:
                        product_found = true
                    break

            if not product_found:
                return false

        return self.product_list_repository.remove_list_of_products_from_list(list_id, products_to_remove)


    def get_products_from_list(self, list_id: int) -> list[product, int]:
        return self.product_list_repository.get_products_from_list(list_id)
