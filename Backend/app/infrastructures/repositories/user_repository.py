from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface

class UserRepository(UserRepositoryInterface):
    def __init__(self):
        pass

    def get_user_by_email(self, email: str):
        pass

    def create_user(self, user_data: dict):
        pass

    def get_user_by_id(self, user_id: int):
        pass