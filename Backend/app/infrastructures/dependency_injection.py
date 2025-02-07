
from app.services.authentication_service import AuthenticationService

from app.infrastructures.repositories.user_repository import UserRepository

def get_authentication_service() -> AuthenticationService:
    return AuthenticationService(UserRepository())