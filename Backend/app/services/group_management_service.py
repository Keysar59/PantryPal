from app.domain.entities.group import Group
from app.domain.repositories_interfaces.group_repository_interface import GroupRepositoryInterface


class GroupManagementService:
    def __init__(self, group_repository: GroupRepositoryInterface):
        self.group_repository = group_repository
        

    def create_group(self, group_name: str, user_email: str) -> int:
        """
        Creates a group and adds the user to it as an admin.
        :param group_name: The name of the new group.
        :param user_email: The email of the user creating the group.
        """

        new_group_id = self.group_repository.create_group(group_name, user_email)

        self.group_repository.add_user_to_group(new_group_id, user_email)
        self.group_repository.promote_user_to_admin(new_group_id, user_email)
        return new_group_id

        
    
    def delete_group(self, group_id: int):
        """
        Deletes a group.
        :param group_id: The id of the group to delete.
        """

        return self.group_repository.delete_group(group_id)

            
    def join_group(self, group_id: int, user_email: str):
        """
        Adds a user to a group.
        :param group_id: The id of the group.
        :param user_email: The email of the user to add to the group.
        """

        return self.group_repository.add_user_to_group(group_id, user_email)

    
    def leave_group(self, group_id: int, user_email: str):
        """
        Removes a user from a group.
        :param group_id: The id of the group.
        :param user_email: The email of the user to remove from the group.
        """

        return self.group_repository.remove_user_from_group(group_id, user_email)
        

    def promote_user_to_admin(self, group_id: int, user_email: str):
        """
        Promotes a user to admin.
        :param group_id: The id of the group.
        :param user_email: The email of the user to promote to admin.
        """

        return self.group_repository.promote_user_to_admin(group_id, user_email)

    
    def demote_admin_to_user(self, group_id: int, user_email: str):
        """
        Demotes a user from admin to user.
        :param group_id: The id of the group.
        :param user_email: The email of the admin to demote to user.
        """

        return self.group_repository.demote_admin_to_user(group_id, user_email)


    def get_groups_by_user_email(self, user_email: str) -> list[int]:
        """
        Gets all groups a user is in.
        :param user_email: The email of the user.
        """

        return self.group_repository.get_groups_by_user_email(user_email)


    def get_group_name_by_id(self, group_id: int) -> str:
        """
        Gets the name of a group by its id.
        :param group_id: The id of the group.
        """

        return self.group_repository.get_group_name_by_id(group_id)


    def get_list_ids_by_group_id(self, group_id: int) -> list[int]:
        """
        Gets the ids of the lists in a group.
        :param group_id: The id of the group.
        """

        return self.group_repository.get_list_ids_by_group_id(group_id)
