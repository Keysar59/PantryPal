from fastapi import APIRouter, Response, HTTPException, status, Depends
from app.services.authentication_service import AuthenticationService
from datetime import timedelta
from app.domain.entities.user import User
from fastapi import Request
from app.infrastructures.dependency_injection import get_authentication_service
router = APIRouter()

@router.post("/signup")
def signup(user_data: User, response: Response, 
           authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Handles user signup and sets a session cookie.
    """
    print(user_data)
    user, token = authentication_service.signup_user(user_data)

    payload = authentication_service.create_token(user.email)

    response.set_cookie(
        key="session_token",
        value=payload,
        httponly=True,  # Prevent JavaScript access
        max_age=int(timedelta(weeks=20).total_seconds()),
        samesite="Lax",  # Protect against CSRF
        secure=True  # Send only over HTTPS

    )

    return {"message": "User created successfully", "user": "testuser"}

@router.post("/login")
def login(user_data: User, response: Response, 
          authentication_service: AuthenticationService = Depends(get_authentication_service)):
    """
    Handles user login, verifies credentials, and sets a session cookie.
    """
    token = authentication_service.login_user(user_data)
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        max_age=int(timedelta(weeks=20).total_seconds()),
        samesite="Lax",
        secure=True
    )

    return {"message": "Login successful", "user": user_data.email}
    

#retrive cookie
@router.get("/status")
def check_status(request: Request):
    token = request.cookies.get("session_token")
    #check if token is valid
    if not token:
        return {"authorized": False}
    return {"authorized": True}



