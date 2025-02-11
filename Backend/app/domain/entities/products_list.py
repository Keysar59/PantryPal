from app.domain.entities.product import Product

class ProductsList:
    list_id: int
    products: list[list[Product, int]]

    def __init__(self, list_id: int):
        self.list_id = list_id

    def get_list_id(self):
        return self.list_id

    def get_products(self):
        return self.products

    def add_product(self, product: Product, quantity: int):
        for product_in_list in self.products:
            if product_in_list[0].get_product_id() == product.get_product_id():
                product_in_list[1] += quantity
                return
        self.products.append((product, quantity))

    def remove_product_by_quantity(self, product: Product, quantity: int):
        """
        Removes a product from the list by quantity.
        If the quantity is greater than the quantity in the list, will not change anything and will return False.
        :param product: Product - The product to remove
        :param quantity: int - The quantity to remove
        :return: bool - True if successful, False if ammount to remove is greater than the quantity in the list or product is not in the list.
        """
        for product_in_list in self.products:
            if product_in_list[0].get_product_id() == product.get_product_id():
                if product_in_list[1] >= quantity:
                    product_in_list[1] -= quantity
                    if product_in_list[1] == 0:
                        self.products.remove(product_in_list)
                    return True
            
        return False

    def add_list_of_products(self, list_of_products_to_add: list[Product, int]):
        for product_to_add in list_of_products_to_add:
            self.add_product(product_to_add[0], product_to_add[1])

    def remove_list_of_products(self, list_of_products_to_remove: list[Product, int]):
        for product_to_remove in list_of_products_to_remove:

            current_product_success = self.remove_product_by_quantity(product_to_remove[0], product_to_remove[1])
            if not current_product_success:
                return False # Currently returns False even if one product is unsuccessfully removed.
        return True
            


                
