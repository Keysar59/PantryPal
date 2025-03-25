from app.domain.entities.user import User
from app.domain.repositories_interfaces.user_repository_interface import UserRepositoryInterface
import os
class UserRepositoryTxt(UserRepositoryInterface):
    def __init__(self):
        self.file_path = "db/users.txt"
        db_dir = os.path.dirname(self.file_path)
        # Ensure the directory exists
        os.makedirs(db_dir, exist_ok=True)
        # check if the file exists
        if not os.path.exists(self.file_path):
            # create the file
            with open(self.file_path, "w") as file:
                file.write("")
        
    def get_user_by_email(self, email: str):
        with open(self.file_path, "r") as file:
            for line in file:
                if email in line:
                    return User(line.split(",")[0], line.split(",")[1])
        return None


    def create_user(self, user_data: User):
        with open(self.file_path, "a") as file:
            file.write(f"{user_data.email},{user_data.password}\n")
        return User(user_data.email, user_data.password)

