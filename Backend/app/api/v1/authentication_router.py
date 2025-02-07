from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.authentication_service import AuthenticationService
from datetime import timedelta
from app.schemas.user_schema import UserSignup
from fastapi import Request
from app.infrastructures.dependency_injection import get_authentication_service
router = APIRouter()

@router.post("/signup")
def signup(user_data: UserSignup, response: Response, 
           authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Handles user signup and sets a session cookie.
    """
    print(user_data)
    user, token = authentication_service.signup_user(user_data)

    # if not user:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="User could not be created"
    #     )

    # Set cookie (token will expire in 7 days)
    response.set_cookie(
        key="session_token",
        value="testtoken12",
        httponly=True,  # Prevent JavaScript access
        max_age=int(timedelta(weeks=20).total_seconds()),
        samesite="Lax",  # Protect against CSRF
        secure=True  # Send only over HTTPS
    )

    return {"message": "User created successfully", "user": "testuser"}

#retrive cookie
@router.get("/status")
def check_status(request: Request):
    token = request.cookies.get("session_token")
    #check if token is valid
    
    if not token:
        return {"authorized": False}
    return {"authorized": True}



