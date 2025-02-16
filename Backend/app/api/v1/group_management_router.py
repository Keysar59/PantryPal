from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.group_management_service import GroupManagementService
from app.domain.entities.group import Group
from fastapi import Request
from app.infrastructures.dependency_injection import get_group_management_service

router = APIRouter()

@router.post("/create_group")
def create_group(group_name: str, user_email: str, 
                 group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Creates a group and adds the user to it as an admin.
    :param group_name: The name of new the group.
    :param user_email: The email of the user creating the group.
    """
    group_id = group_service.create_group(group_name, user_email)

    if group_id == -1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Group could not be created")

    return {"message": "Group created successfully", "group_id": group_id}

@router.post("/delete_group")
def delete_group(group_id: int, 
                 group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Deletes a group.
    :param group_id: The id of the group to delete.
    """
    success = group_service.delete_group(group_id)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Group could not be deleted")

    return {"message": "Group deleted successfully"}

@router.post("/join_group")
def join_group(group_id: int, user_email: str,
               group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Adds user to a group.
    :param group_id: The id of the group.
    :param user_email: The email of the user to add to the group.
    """
    success = group_service.join_group(group_id, user_email)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User could not join group")

    return {"message": "User joined group successfully"}

@router.post("/leave_group")
def leave_group(group_id: int, user_email: str,
                group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Removes user from a group.
    :param group_id: The id of the group.
    :param user_email: The email of the user to remove from the group.
    """
    success = group_service.leave_group(group_id, user_email)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User could not leave group")

    return {"message": "User left group successfully"}

@router.post("/promote_user")
def promote_user(group_id: int, user_email: str,
                 group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Promotes a user to admin.
    :param group_id: The id of the group.
    :param user_email: The email of the user to promote to admin.
    """
    success = group_service.promote_user_to_admin(group_id, user_email)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User could not be promoted to admin")

    return {"message": "User promoted to admin successfully"}


@router.post("/demote_user")
def demote_user(group_id: int, user_email: str,
                group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Demotes a user from admin to user.
    :param group_id: The id of the group.
    :param user_email: The email of the admin to demote to user.
    """
    success = group_service.demote_admin_to_user(group_id, user_email)

    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User could not be demoted from admin to user")

    return {"message": "Admin demoted to user successfully"}

@router.get("/get_groups_by_user_email")
def get_groups_by_user_email(user_email: str,
                             group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Gets all groups a user is in.
    :param user_email: The email of the user.
    """
    groups = group_service.get_groups_by_user_email(user_email)

    if not groups:
        return {"message": "No groups were found", "groups": groups}

    return {"message": "Groups retrieved successfully", "groups": groups}

@router.get("/get_group_name_by_id")
def get_group_name_by_id(group_id: int,
                        group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Gets the name of a group by its id.
    :param group_id: The id of the group.
    """
    group_name = group_service.get_group_name_by_id(group_id)

    if not group_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Group could not be found")

    return {"message": "Group name retrieved successfully", "group_name": group_name}

@router.get("/get_list_ids_by_group_id")
def get_list_ids_by_group_id(group_id: int,
                            group_service: GroupManagementService = Depends(get_group_management_service)):
    """
    Gets the ids of the lists in a group.
    :param group_id: The id of the group.
    """
    list_ids = group_service.get_list_ids_by_group_id(group_id)

    if not list_ids:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No lists were found")

    return {"message": "Lists retrieved successfully", "pantry_list_id": list_ids[0], "default_list_id": list_ids[1], "shopping_list_id": list_ids[2]}

