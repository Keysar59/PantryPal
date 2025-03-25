from app.domain.entities.product import Product

class ProductsList:
    list_id: int
    products: list[tuple[Product, int]]


                
