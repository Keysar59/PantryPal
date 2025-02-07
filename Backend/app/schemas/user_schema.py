from pydantic import BaseModel

class UserSignup(BaseModel):
    email: str
    password: str

