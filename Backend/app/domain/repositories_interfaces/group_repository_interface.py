from app.domain.entities.group import Group

class GroupRepositoryInterface:
    def create_group(self, group_name: str, user_email: str) -> int:
        pass

    def delete_group(self, group_id: int) -> bool:
        pass

    def add_user_to_group(self, group_id: int, user_email: str) -> bool:
        pass

    def remove_user_from_group(self, group_id: int, user_email: str) -> bool:
        pass

    def promote_user_to_admin(self, group_id: int, user_email: str) -> bool:
        pass

    def demote_admin_to_user(self, group_id: int, user_email: str) -> bool:
        pass

    def get_groups_by_user_email(self, user_email: str) -> list[int]:
        pass

    def get_group_name_by_id(self, group_id: int) -> str:
        pass

    def get_list_ids_by_group_id(self, group_id: int) -> list[int]:
        pass

