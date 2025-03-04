from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.testing_service import TestingService
from app.infrastructures.dependency_injection import get_testing_service
from app.domain.entities.product import products_to_json_list, product_to_json

router = APIRouter()

@router.get("/get_product_by_barcode")
def get_product_by_barcode(barcode: str, testing_service: TestingService = Depends(get_testing_service)):
    product = testing_service.get_product_by_barcode(barcode)
    return product_to_json(product)

@router.get("/get_product_by_name")
def get_product_by_name(name: str, page: int = 1, testing_service: TestingService = Depends(get_testing_service)):
    products = testing_service.get_products_by_name(name, page)
    return products_to_json_list(products)

@router.get("/get_product_by_category")
def get_product_by_category(category: str, page: int = 1, testing_service: TestingService = Depends(get_testing_service)):
    products = testing_service.get_products_by_category(category, page)
    return products_to_json_list(products)





@router.get("/get_users_data")
def get_users_data(testing_service: TestingService = Depends(get_testing_service)):
    data = testing_service.get_users_data()
    print("data2", data)
    return {"data:": data}


