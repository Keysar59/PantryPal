from app.domain.entities.group import Group

class GroupRepositoryInterface:
    def create_group(self, group: Group) -> Group:
        pass
    
    def get_group_by_id(self, group_id: str) -> Group:
        pass

