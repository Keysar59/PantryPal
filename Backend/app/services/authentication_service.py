import jwt as pyjwt
import datetime
from typing import Optional
from app.domain.entities.user import User
from app.schemas.user_schema import UserSignup
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface


SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

class AuthenticationService:
    def __init__(self, user_repository: UserRepositoryInterface):
        self.user_repository = user_repository

    def signup_user(self, user_data: UserSignup) -> Optional[tuple]:
        """
        Creates a new user and returns a JWT token.
        """
        if (',' in user_data.email or ',' in user_data.password or user_data.email == "" or user_data.password == "" or user_data.email == None or user_data.password == None):
            print("User data is invalid")
            return None, None
        user = self.user_repository.get_user_by_email(user_data.email)
        if user:
            print("User already exists")
            return None, None

        user = self.user_repository.create_user(user_data)
        if not user:
            print("User could not be created (db)")
            return None, None

        token = self.create_token(user.email)
        return user, token


    def create_token(self, user_email: str) -> str:
        """
        Generates a JWT token with user ID.
        """

        payload = {
            "sub": user_email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=20)
        }

        return pyjwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


    def verify_token(self, token: str) -> Optional[User]:
        """
        Verifies the JWT token and returns the user if valid.
        """
        try:
            payload = pyjwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_email = payload.get("sub")
            return self.user_repository.get_user_by_email(user_email)
        

        except pyjwt.ExpiredSignatureError:
            return None
        except pyjwt.InvalidTokenError:
            return None
