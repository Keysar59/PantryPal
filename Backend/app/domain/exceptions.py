from typing import Any
from fastapi import HTTPException

from starlette.status import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST

class AppException(HTTPException):
    """Base exception"""
    def __init__(self, status_code: int, detail: Any):
        super().__init__(status_code=status_code, detail=detail)

class UserAlreadyExistsException(AppException):
    def __init__(self, user_email: str):
        self.user_email = user_email
        self.message = f"A user with the email {user_email} already exists."
        super().__init__(status_code=HTTP_409_CONFLICT, detail=self.message)

class InvalidSignupDataException(AppException):
    def __init__(self, message: str = "Invalid email/password."):
        super().__init__(status_code=HTTP_400_BAD_REQUEST, detail=message)

class UserDoesNotExistsException(AppException):
    def __init__(self, message: str = "User with this email does not exists."):
        super().__init__(status_code=HTTP_404_NOT_FOUND, detail=message)