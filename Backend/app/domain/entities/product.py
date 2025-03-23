import json
from pydantic import BaseModel
from typing import Optional, Dict, Any

class Product(BaseModel):
    product_id: str
    product_name: str
<<<<<<< HEAD
    product_image_url: str
    # there is no product description in the json data
=======
    product_description: str

>>>>>>> parent of 835f2e4 (repo, intefrace, service, router)
    
    # No need for constractor in BaseModel.
    """def __init__(self, product_id: str, product_name: str, product_image_url: str):
        self.product_id = product_id
        self.product_name = product_name
        self.product_image_url = product_image_url"""

class ProductEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Product):
            return obj.__dict__
        return super().default(obj)
    
def product_to_json(product: Product) -> str:
    return json.dumps(product, cls=ProductEncoder)

def products_to_json_list(products: list[Product]) -> list[str]:
    return [product_to_json(product) for product in products]

def full_json_to_product(json_data: Dict[str, Any]) -> Product:
    product_data = json_data.get("product", {})
    return Product(
        product_id=json_data.get("code", ""),
        product_name=product_data.get("product_name") or product_data.get("product_name_en", ""),
        product_image_url=product_data.get("image_url", "")
    )
        
def json_to_product(json_data: Dict[str, Any]) -> Product:
    return Product(
        product_id=json_data.get("code", ""),
        product_name=json_data.get("product_name") or json_data.get("product_name_en", ""),
        product_image_url=json_data.get("image_url", "")
    )

def json_to_product_list(json_data: Dict[str, Any]) -> list[Product]:
    return [json_to_product(product) for product in json_data.get("products", [])]
    
    
    