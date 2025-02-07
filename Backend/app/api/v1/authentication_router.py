from fastapi import APIRouter, Response, HTTPException, status
from app.services.authentication_service import AuthenticationService
from app.schemas.user_schema import UserSignup
from datetime import timedelta

router = APIRouter()

@router.post("/signup")
def signup(user_data: UserSignup, response: Response):
    """
    Handles user signup and sets a session cookie.
    """
    user, token = AuthenticationService.signup_user(user_data)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User could not be created"
        )

    # Set cookie (token will expire in 7 days)
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,  # Prevent JavaScript access
        max_age=int(timedelta(days=7).total_seconds()),
        samesite="Lax",  # Protect against CSRF
        secure=True  # Send only over HTTPS
    )

    return {"message": "User created successfully", "user": user}
