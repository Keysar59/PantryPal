
from app.services.authentication_service import AuthenticationService
from app.services.testing_service import TestingService
from app.infrastructures.repositories.user_repository_txt import UserRepositoryTxt

def get_authentication_service() -> AuthenticationService:
    return AuthenticationService(UserRepositoryTxt())

def get_testing_service() -> TestingService:
    return TestingService()