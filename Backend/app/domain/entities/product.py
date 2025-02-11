class Product:
    product_id: str
    product_name: str
    product_description: str

    def __init__(self, product_id: str, product_name: str, product_description: str):
        self.product_id = product_id
        self.product_name = product_name
        self.product_description = product_description

    def get_product_id(self):
        return self.product_id

    def get_product_name(self):
        return self.product_name

    def get_product_description(self):
        return self.product_description

    
    
    
    
    