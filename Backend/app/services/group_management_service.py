from app.domain.entities.group import Group
from app.domain.entities.user import User
from app.domain.repositories_interfaces.group_repository_interface import GroupRepositoryInterface


class GroupManagementService:
    def __init__(self, group_repository: GroupRepositoryInterface):
        self.group_repository = group_repository

    def create_group(self, group_name: str, user_email: str) -> int:
        new_group_id = self.group_repository.create_group(group_name)
        if self.group_repository.add_user_to_group(new_group_id, user_email):
            if self.group_repository.promote_user_to_admin(new_group_id, user_email):
                return new_group_id
        self.group_repository.delete_group(new_group_id)
        return -1
    
    def delete_group(self, group_id: int) -> bool:
        if self.group_repository.delete_group(group_id):
            return True
        return False
            
    def join_group(self, group_id: int, user_email: str) -> bool:
        if self.group_repository.add_user_to_group(group_id, user_email):
            return True
        return False
    
    def leave_group(self, group_id: int, user_email: str) -> bool:
        if self.group_repository.remove_user_from_group(group_id, user_email):
            return True
        return False

    def promote_user_to_admin(self, group_id: int, user_email: str) -> bool:
        if self.group_repository.promote_user_to_admin(group_id, user_email):
            return True
        return False
    
    def demote_admin_to_user(self, group_id: int, user_email: str) -> bool:
        if self.group_repository.demote_admin_to_user(group_id, user_email):
            return True
        return False

    def get_groups_by_user_email(self, user_email: str) -> list[int]:
        return self.group_repository.get_groups_by_user_email(user_email)
