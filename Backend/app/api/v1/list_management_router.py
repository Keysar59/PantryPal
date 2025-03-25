from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.list_management_service import ListManagementService
from app.services.group_management_service import GroupManagementService
from app.services.authentication_service import AuthenticationService
from app.domain.entities.products_list import ProductsList
from app.domain.entities.product import Product
from fastapi import Request
from app.infrastructures.dependency_injection import get_list_management_service
from app.infrastructures.dependency_injection import get_group_management_service
from app.infrastructures.dependency_injection import get_authentication_service

router = APIRouter()

@router.post("/add_product_to_list")
def add_product_to_list(request: Request,
                        list_id: int, product: Product, quantity: int,
                        list_service: ListManagementService = Depends(get_list_management_service),
                        group_service: GroupManagementService = Depends(get_group_management_service),
                        authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Adds a product to specified list.
    :param list_id: The id of the list.
    :param product: The product to add.
    :param quantity: The quantity of the product to add.
    """

    token = request.cookies.get("session_token")
    user_email = authentication_service.verify_token(token)  # Verify token
    group_id = list_id // 10

    authorized = group_service.in_group(group_id, user_email)

    if authorized:
        success = list_service.add_product_to_list(list_id, product, quantity)

        if not success:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add product")

        return {"message": "Product added successfully"}

    else:
        return {"message": "User unauthorized"}

@router.post("/add_list_of_products_to_list")
def add_list_of_products_to_list(request: Request,
                                 list_id: int, response: Response, products_to_add: list[tuple[Product, int]],
                                 list_service: ListManagementService = Depends(get_list_management_service),
                                 group_service: GroupManagementService = Depends(get_group_management_service),
                                 authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Adds multiple products to specified list.
    :param list_id: The id of the list.
    :param products_to_add: A list of tuples containing products and their quantities.
    """
    token = request.cookies.get("session_token")
    user_email = authentication_service.verify_token(token)  # Verify token
    group_id = list_id // 10

    authorized = group_service.in_group(group_id, user_email)

    if authorized:

        success = list_service.add_list_of_products_to_list(list_id, products_to_add)

        if not success:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not add products")

        return {"message": "Products added successfully"}

    else:
        return {"message": "User unauthorized"}

@router.post("/remove_product_from_list")
def remove_product_from_list(request: Request,
                             list_id: int, response: Response, product_id: str, quantity: int,
                             list_service: ListManagementService = Depends(get_list_management_service),
                             group_service: GroupManagementService = Depends(get_group_management_service),
                             authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Removes a product from specified list.
    :param list_id: The id of the list.
    :param product_id: The id of the product to remove.
    :param quantity: The quantity of the product to remove.
    """

    token = request.cookies.get("session_token")
    user_email = authentication_service.verify_token(token)  # Verify token
    group_id = list_id // 10

    authorized = group_service.in_group(group_id, user_email)

    if authorized:

        success = list_service.remove_product_from_list(list_id, product_id, quantity)

        if not success:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove product")

        return {"message": "Product removed successfully"}

    else:
        return {"message": "User unauthorized"}

@router.post("/remove_list_of_products_from_list")
def remove_list_of_products_from_list(request: Request,
                                      list_id: int, response: Response, products_to_remove: list[tuple[str, int]],
                                      list_service: ListManagementService = Depends(get_list_management_service),
                                      group_service: GroupManagementService = Depends(get_group_management_service),
                                      authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Removes multiple products from specified list.
    :param list_id: The id of the list.
    :param products_to_remove: A list of tuples containing product ids and quantities to remove.
    """

    token = request.cookies.get("session_token")
    user_email = authentication_service.verify_token(token)  # Verify token
    group_id = list_id // 10

    authorized = group_service.in_group(group_id, user_email)

    if authorized:

        success = list_service.remove_list_of_products_from_list(list_id, products_to_remove)

        if not success:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not remove products")

        return {"message": "Products removed successfully"}

    else:
        return {"message": "User unauthorized"}

@router.post("/get_products_from_list")
def get_products_from_list(request: Request,
                           list_id: int,
                           list_service: ListManagementService = Depends(get_list_management_service),
                           group_service: GroupManagementService = Depends(get_group_management_service),
                           authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Fetches all products from specified list.
    :param list_id: The id of the list.
    """

    token = request.cookies.get("session_token")
    user_email = authentication_service.verify_token(token)  # Verify token
    group_id = list_id // 10

    authorized = group_service.in_group(group_id, user_email)

    if authorized:

        products = list_service.get_products_from_list(list_id)

        if products is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Couldn't fetch products")

        if not products:
            return {"message": "No products found.", "products": products}

        return {"message": "Products fetched successfully", "products": products}

    else:
        return {"message": "User unauthorized"}