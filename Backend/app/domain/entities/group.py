from app.domain.entities.user import User
from app.domain.entities.products_list import ProductsList
class Group:
    group_id: str
    group_name: str

    group_admins: list[User]
    group_members: list[User]

    group_lists: tuple[ProductsList, ProductsList, ProductsList]

    def __init__(self, group_id: str, group_name: str, group_lists: tuple[ProductsList, ProductsList, ProductsList]):
        self.group_id = group_id
        self.group_name = group_name
        self.group_lists = group_lists

    def get_group_id(self):
        return self.group_id

    def get_group_name(self):
        return self.group_name

    def get_group_lists(self):
        return self.group_lists

    def change_group_name(self, new_group_name: str):
        if new_group_name != None and new_group_name != "":
            self.group_name = new_group_name
            return True
        return False


    def add_group_admin(self, user: User):
        if user in self.group_admins:
            return False
        self.group_admins.append(user)
        return True


    def remove_group_admin(self, user: User):
        if user in self.group_admins:
            self.group_admins.remove(user)
            return True
        return False


    def add_group_member(self, user: User):
        if user in self.group_members:
            return False
        self.group_members.append(user)
        return True


    def remove_group_member(self, user: User):
        if user in self.group_members:
            self.group_members.remove(user)
            return True
        return False

    

        
        
