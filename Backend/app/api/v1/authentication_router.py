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
    user, _ = authentication_service.signup_user(user_data)

    token = authentication_service.create_token(user.email)
    
    setcookie(response, token)

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

    setcookie(response, token)

    return {"message": "Login successful", "user": user_data.email}
    
def setcookie(response, token):
    print("login token: ", token)
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        max_age=int(timedelta(weeks=20).total_seconds()),
        samesite="None",
        secure=True,
    )

@router.get("/status")
def check_status(
    request: Request, 
    authentication_service: AuthenticationService = Depends(get_authentication_service)
):
    token = request.cookies.get("session_token")
    print("token:", token)

    user_email = authentication_service.verify_token(token)  # Verify token

    return {"authorized": True, "user": user_email}




