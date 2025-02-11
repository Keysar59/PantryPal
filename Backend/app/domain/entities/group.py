from app.domain.entities.user import User
from app.domain.entities.products_list import ProductsList
class Group:
    group_id: str
    group_name: str

    group_admins: list[User]
    group_members: list[User]

    group_lists: tuple[ProductsList, ProductsList, ProductsList]
