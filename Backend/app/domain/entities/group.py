from app.domain.entities.user import User
from app.domain.entities.products_list import ProductsList
class Group:
    group_id: int
    group_name: str

    group_admins: list[User]
    group_members: list[User]

    pantry_list_id: int
    default_list_id: int
    shopping_list_id: int   
