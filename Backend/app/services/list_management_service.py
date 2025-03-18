class ListManagementService:

    def __init__(self, list_repository: ListRepositoryInterface):
        self.list_repository = list_repository

    def add_product_to_list(self, prodcuts_list: ProductsList, product: Product, quantity: int):
        prodcuts_list.add_product(product, quantity)
        return self.list_repository.update_list(prodcuts_list) #**


    def remove_product_from_list(self, products_list: ProductsList, product: Product, quantity: int):
        products_list.remove_product_by_quantity(product, quantity)
        return self.list_repository.update_list(products_list) #**

    def add_list_of_products_to_list(self, products_list: ProductsList, list_of_products_to_add: list[Product, int]):
        products_list.add_list_of_products(list_of_products_to_add)
        return self.list_repository.update_list(products_list) #**

    def remove_list_of_products_from_list(self, products_list: ProductsList, list_of_products_to_remove: list[Product, int]):
        products_list.remove_list_of_products(list_of_products_to_remove)
        return self.list_repository.update_list(products_list) #**
