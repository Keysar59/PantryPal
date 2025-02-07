import jwt
import datetime
from typing import Optional
from app.domain.entities.user import User
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

class AuthenticationService:
    def __init__(self, user_repository: UserRepositoryInterface):
        self.user_repository = user_repository

    def signup_user(self, user_data) -> Optional[tuple]:
        """
        Creates a new user and returns a JWT token.
        """
        print("hello im service")
        user = self.user_repository.create_user(user_data)
        if not user:
            return None, None


        token = AuthenticationService.create_token(user.id)
        return user, token

    def create_token(self, user_id: int) -> str:
        """
        Generates a JWT token with user ID.
        """
        payload = {
            "sub": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=20)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    def verify_token(self, token: str) -> Optional[User]:
        """
        Verifies the JWT token and returns the user if valid.
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")
            return self.user_repository.get_user_by_id(user_id)
        
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
