import jwt as pyjwt
import datetime
from typing import Optional
from app.domain.exceptions import UserAlreadyExistsException, InvalidSignupDataException, UserDoesNotExistsException, ExpiredTokenException, InvalidTokenException
from app.domain.entities.user import User
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface


SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

class AuthenticationService:
    def __init__(self, user_repository: UserRepositoryInterface):
        self.user_repository = user_repository

    def signup_user(self, user_data: User) -> Optional[tuple]:
        
        # Signup data validation
        if (',' in user_data.email or ',' in user_data.password or user_data.email == "" or user_data.password == "" or user_data.email == None or user_data.password == None):
            raise InvalidSignupDataException()
        
        # Check if user already exists in db
        user = self.user_repository.user_exists(user_data.email)
        if user:
            raise UserAlreadyExistsException(user_data.email)

        # Creates a user
        user = self.user_repository.create_user(user_data)

        token = self.create_token(user.email)
        return user, token
    
    def login_user(self, user_data: User) -> Optional[str]:
        user = self.user_repository.get_user_by_email(user_data.email)
        if not user:
            raise UserDoesNotExistsException()
        token = self.create_token(user.email)
        return token


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

        if not token:
            print("no token")
            raise InvalidTokenException()
        
        try:
            payload = pyjwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_email = payload.get("sub")
            if not user_email:
                print("token invalid no user email")
                InvalidTokenException()
            return self.user_repository.user_exists(user_email)
        
        except pyjwt.ExpiredSignatureError:
            raise ExpiredTokenException()
        except pyjwt.InvalidTokenError:
            raise InvalidTokenException()
