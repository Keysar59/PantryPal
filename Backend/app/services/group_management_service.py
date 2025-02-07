from app.domain.entities.group import Group
from app.domain.entities.user import User
from app.domain.repositories_interfaces.group_repository_interface import GroupRepositoryInterface


class GroupManagementService:
    def __init__(self, group_repository: GroupRepositoryInterface):
        self.group_repository = group_repository


    def create_group(self, group: Group, user: User):
        return self.group_repository.create_group(group, user)
