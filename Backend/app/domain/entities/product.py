import json
from pydantic import BaseModel

class Product(BaseModel):
    product_id: str
    product_name: str
    product_image_url: str
    # there is no product description in the json data
    
    """def __init__(self, product_id: str, product_name: str, product_image_url: str):
        self.product_id = product_id
        self.product_name = product_name
        self.product_image_url = product_image_url"""

class ProductEncoder(json.JSONEncoder):
    def default(self, obj):
        
        if isinstance(obj, Product):
            return obj.__dict__
        
        return super().default(obj)
    
def product_to_json(product: Product) -> dict:
    return json.dumps(product, cls=ProductEncoder)

def products_to_json_list(products: list[Product]) -> list[dict]:
    return [product_to_json(product) for product in products]

def full_json_to_product(json_data: dict) -> Product:
    return Product(
        product_id=json_data.get("code"),
        product_name=json_data.get("product", {}).get("product_name") if json_data.get("product", {}).get("product_name") else json_data.get("product", {}).get("product_name_en"),
        product_image_url=json_data.get("product", {}).get("image_url"),
        # there is no product description in the json data
    )
        
def json_to_product(json_data: dict) -> Product:
    return Product(
        product_id=json_data.get("code"),
        product_name=json_data.get("product_name") if json_data.get("product_name") else json_data.get("product_name_en"),
        product_image_url=json_data.get("image_url"),
        # there is no product description in the json data
    )

def json_to_product_list(json_data: dict) -> list[Product]:
    return [json_to_product(product) for product in json_data.get("products", [])]
    
    