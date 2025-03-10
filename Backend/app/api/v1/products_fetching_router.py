from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.domain.entities.product import products_to_json_list, product_to_json
from app.infrastructures.dependency_injection import get_products_fetching_service
from app.services.products_fetching_service import ProductsFetchingService

router = APIRouter()


@router.get("/products/{group_id}")
async def get_products(group_id: str):
    return {"group_id": group_id}


@router.get("/get_product_by_barcode")
def get_product_by_barcode(barcode: str, fetching_service: ProductsFetchingService = Depends(get_products_fetching_service)):
    product = fetching_service.get_product_by_barcode(barcode)
    return product_to_json(product)

@router.get("/get_product_by_name")
def get_product_by_name(name: str, page: int = 1, fetching_service: ProductsFetchingService = Depends(get_products_fetching_service)):
    products = fetching_service.get_products_by_name(name, page)
    return products_to_json_list(products)

@router.get("/get_product_by_category")
def get_product_by_category(category: str, page: int = 1, fetching_service: ProductsFetchingService = Depends(get_products_fetching_service)):
    products = fetching_service.get_products_by_category(category, page)
    return products_to_json_list(products)

