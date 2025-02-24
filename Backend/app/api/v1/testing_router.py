from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.testing_service import TestingService
from app.infrastructures.dependency_injection import get_testing_service

router = APIRouter()

@router.get("/get_product_by_barcode")
def get_product_by_barcode(barcode: str, testing_service: TestingService = Depends(get_testing_service)):
    product = testing_service.get_product_by_barcode(barcode)
    return product

@router.get("/get_users_data")
def get_users_data(testing_service: TestingService = Depends(get_testing_service)):
    data = testing_service.get_users_data()
    print("data2", data)
    return {"data:": data}


