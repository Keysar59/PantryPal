from typing import Optional
from app.domain.entities.user import User

class UserRepositoryInterface:
    def create_user(self, user_data: dict) -> Optional[User]:
        pass

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        pass