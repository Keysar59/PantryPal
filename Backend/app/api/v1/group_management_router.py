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




