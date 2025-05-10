from typing import Any
from fastapi import HTTPException

from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST

# ============================= Auth Exceptions =============================
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

class ExpiredTokenException(AppException):
    def __init__(self, message: str = "Token expired."):
        super().__init__(status_code=HTTP_401_UNAUTHORIZED, detail=message)

class InvalidTokenException(AppException):
    def __init__(self, message: str = "Token invalid."):
        super().__init__(status_code=498, detail=message)

class PasswordIncorrectException(AppException):
    def __init__(self, message: str = "Password incorrect."):
        super().__init__(status_code=401, detail=message)

# ============================= Group Exceptions =============================

class InvalidParameters(AppException):
    def __init__(self, message: str = "Invalid Paramaters."):
        super().__init__(status_code=400, detail=message)

class GroupCreationException(AppException):
    def __init__(self, message: str = "Failed creating group."):
        super().__init__(status_code=500, detail=message)

class NonExistentGroupException(AppException):
    def __init__(self, message: str = "Couldn't find group with matching id."):
        super().__init__(status_code=404, detail=message)

class UserAlreadyInGroupException(AppException):
    def __init__(self, message: str = "User is already in group."):
        super().__init__(status_code=409, detail=message)

class UserNotInGroupException(AppException):
    def __init__(self, message: str = "User is not in group."):
        super().__init__(status_code=403, detail=message)

class CannotRemoveCreatorException(AppException):
    def __init__(self, message: str = "Creator can't be demoted or leave group."):
        super().__init__(status_code=403, detail=message)

class UserAlreadyAdminException(AppException):
    def __init__(self, message: str = "User is already an admin."):
        super().__init__(status_code=409, detail=message)

class NoPermissionException(AppException):
    def __init__(self, message: str = "No permission."):
        super().__init__(status_code=403, detail=message)