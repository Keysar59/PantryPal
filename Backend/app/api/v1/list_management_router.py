from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.list_management_service import ListManagementService
from app.domain.entities.products_list import ProductsList
from app.domain.entities.product import Product
from fastapi import Request
from app.infrastructures.dependency_injection import get_list_management_service

router = APIRouter()

@router.post("/add_product_to_list")
def add_product_to_list(list_id: int, product: Product, quantity: int,
                        list_service: ListManagementService = Depends(get_list_management_service)):
    """
    Adds a product to specified list.
    :param list_id: The id of the list.
    :param product: The product to add.
    :param quantity: The quantity of the product to add.
    """
    success = list_service.add_product_to_list(list_id, product, quantity)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add product")

    return {"message": "Product added successfully"}

@router.post("/add_list_of_products_to_list")
def add_list_of_products_to_list(list_id: int, response: Response, products_to_add: list[tuple[Product, int]],
                                 list_service: ListManagementService = Depends(get_list_management_service)):
    """
    Adds multiple products to specified list.
    :param list_id: The id of the list.
    :param products_to_add: A list of tuples containing products and their quantities.
    """
    success = list_service.add_list_of_products_to_list(list_id, products_to_add)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add products")

    return {"message": "Products added successfully"}

@router.post("/remove_product_from_list")
def remove_product_from_list(list_id: int, response: Response, product_id: str, quantity: int,
                             list_service: ListManagementService = Depends(get_list_management_service)):
    """
    Removes a product from specified list.
    :param list_id: The id of the list.
    :param product_id: The id of the product to remove.
    :param quantity: The quantity of the product to remove.
    """
    success = list_service.remove_product_from_list(list_id, product_id, quantity)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove product")

    return {"message": "Product removed successfully"}

@router.post("/remove_list_of_products_from_list")
def remove_list_of_products_from_list(list_id: int, response: Response, products_to_remove: list[tuple[str, int]],
                                      list_service: ListManagementService = Depends(get_list_management_service)):
    """
    Removes multiple products from specified list.
    :param list_id: The id of the list.
    :param products_to_remove: A list of tuples containing product ids and quantities to remove.
    """
    success = list_service.remove_list_of_products_from_list(list_id, products_to_remove)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove products")

    return {"message": "Products removed successfully"}

@router.post("/get_products_from_list")
def get_products_from_list(list_id: int,
                           list_service: ListManagementService = Depends(get_list_management_service)):
    """
    Fetches all products from specified list.
    :param list_id: The id of the list.
    """
    products = list_service.get_products_from_list(list_id)

    if products is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Couldn't fetch products")

    if not products:
        return {"message": "No products found.", "products": products}

    return {"message": "Products fetched successfully", "products": products}