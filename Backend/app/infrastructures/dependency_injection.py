from app.services.authentication_service import AuthenticationService
from app.services.testing_service import TestingService
from app.services.group_management_service import GroupManagementService
from app.services.list_management_service import ListManagementService
from app.infrastructures.repositories.user_repository_sql import UserRepositorySQL
from app.infrastructures.repositories.group_repository_sql import GroupRepositorySQL
from app.infrastructures.repositories.products_list_repository_sql import ListRepositorySQL
from app.services.products_fetching_service import ProductsFetchingService

# Create a single instance of UserRepositorySQL
_user_repository = UserRepositorySQL()
_group_repository = GroupRepositorySQL()
_list_repository = ListRepositorySQL()

_testing_service = TestingService(_user_repository)
_group_management_service = GroupManagementService(_group_repository)
_list_management_service = ListManagementService(_list_repository)
_authentication_service = AuthenticationService(_user_repository)
# _products_fetching_service = ProductsFetchingService(_user_repository)

def get_authentication_service() -> AuthenticationService:
    return _authentication_service

def get_group_management_service() -> GroupManagementService:
    return _group_management_service

def get_list_management_service() -> ListManagementService:
    return _list_management_service

def get_testing_service() -> TestingService:
    return _testing_service

# def get_products_fetching_service() -> ProductsFetchingService:
#     return _products_fetching_service
