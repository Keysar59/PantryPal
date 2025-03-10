from abc import ABC, abstractmethod
from typing import Optional
from app.domain.entities.user import User

class UserRepositoryInterface(ABC):
    @abstractmethod
    def create_user(self, user_data: dict) -> Optional[str]:
        pass  # Abstract method must be implemented in subclasses

    @abstractmethod
    def get_user_password(self, email: str) -> Optional[str]:
        pass

    @abstractmethod
    def user_exists(self, email: str) -> bool:
        pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> Optional[User]:
        pass
