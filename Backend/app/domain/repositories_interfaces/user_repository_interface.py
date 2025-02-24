from typing import Optional
from app.domain.entities.user import User

class UserRepositoryInterface:
    def create_user(self, user_data: dict) -> Optional[str]:
        pass

    def get_user_password(self, email: str) -> Optional[str]:
        pass

    def user_exists(self, email: str) -> bool:
        pass
