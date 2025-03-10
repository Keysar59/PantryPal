from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.list_management_service import ListManagementService
from app.domain.entities.prodcuts_list import ProductsList
from app.domain.entities.product import Product
from fastapi import Request
from app.infrastructures.dependency_injection import get_list_management_service

router = APIRouter()

@router.post("/add_product_to_list")
def add_product_to_list(list_id: int, product: Product, quantity: int,
                        list_service: ListManagementService = Depends(get_list_management_service)):
    success = list_service.add_product_to_list(list_id, product, quantity)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add product")

    return {"message": "Product added successfully"}

@router.post("/add_list_of_products_to_list")
def add_list_of_products_to_list(list_id: int, products_to_add: list[Product, int],
                                 list_service: ListManagementService = Depends(get_list_management_service)):
    success = list_service.add_list_of_products_to_list(list_id, products_to_add)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add products")

    return {"message": "Products added successfully"}

@router.post("/remove_product_from_list")
def remove_product_from_list(list_id: int, product: Product, quantity: int,
                             list_service: ListManagementService = Depends(get_list_management_service)):
    success = list_service.remove_product_from_list(list_id, product, quantity)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove product")

    return {"message": "Product removed successfully"}

@router.post("/remove_list_of_products_from_list")
def remove_list_of_products_from_list(list_id: int, products_to_remove: list[Product, int],
                                      list_service: ListManagementService = Depends(get_list_management_service)):
    success = list_service.remove_list_of_products_from_list(list_id, products_to_remove)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove products")

    return {"message": "Products removed successfully"}

@router.post("/get_products_from_list")
def get_products_from_list(list_id: int,
                           list_service: ListManagementService = Depends(get_list_management_service)):
    products = list_service.get_products_from_list(list_id)

    if not products:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Couldn't fetch products")

    return {"message": "Products fetched successfully", "products": products}