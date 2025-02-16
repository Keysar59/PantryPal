
from app.services.authentication_service import AuthenticationService
from app.services.group_management_service import GroupManagementService
from app.infrastructures.repositories.user_repository_txt import UserRepositoryTxt
from app.infrastructures.repositories.group_repository_txt import GroupRepositoryTxt

def get_authentication_service() -> AuthenticationService:
    return AuthenticationService(UserRepositoryTxt())

def get_group_management_service() -> GroupManagementService:
    return GroupManagementService(GroupRepositoryTxt())