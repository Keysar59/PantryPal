**Clean Architecture in PantryPal**

## Overview
Clean Architecture is a design pattern that organizes code into clear, maintainable layers, reducing dependencies and improving testability. This document explains the purpose of each layer in **PantryPal** and provides examples.

---

## **1. API Layer (Routers)**
**Folder:** `app/api/`

### **Role:**
- Acts as the entry point for HTTP requests.
- Defines API endpoints.
- Delegates requests to controllers.
- Does not contain business logic.

### **Example (`authentication_router.py`):**
```python
from fastapi import APIRouter
from app.controllers.authentication_controller import AuthenticationController

router = APIRouter()

@router.post("/login")
def login(user_data: dict):
    return AuthenticationController.login(user_data)
```

---

## **2. Controllers Layer**
**Folder:** `app/controllers/`

### **Role:**
- Processes API requests.
- Calls the appropriate service for business logic.
- Returns responses to the API layer.

### **Example (`authentication_controller.py`):**
```python
from app.services.authentication_service import AuthenticationService
from fastapi import HTTPException, status

class AuthenticationController:
    @staticmethod
    def login(user_data: dict):
        user = AuthenticationService.authenticate_user(user_data["email"], user_data["password"])
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return user
```

---

## **3. Domain Layer (Business Logic)**
**Folder:** `app/domain/`

### **Role:**
- Contains core business logic.
- Defines business entities.
- Interfaces with repositories (abstractions for data access).

### **Example (`entities/user.py`):**
```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: int
    email: EmailStr
    name: str
    hashed_password: str
    
    def check_password(self, password: str) -> bool:
        return self.hashed_password == password  # Replace with proper hash check
```

---

## **4. Services Layer (Application Logic)**
**Folder:** `app/services/`

### **Role:**
- Implements business use cases.
- Calls repositories to access data.
- Does not directly interact with FastAPI or HTTP requests.

### **Example (`authentication_service.py`):**
```python
from app.domain.repositories_interfaces.user_repository import UserRepository
from app.schemas.user_schema import UserResponse
from typing import Optional

class AuthenticationService:
    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[UserResponse]:
        user = UserRepository.get_user_by_email(email)
        if user and user.check_password(password):
            return UserResponse(id=user.id, email=user.email, name=user.name)
        return None
```

---

## **5. Infrastructure Layer (Data & External APIs)**
**Folder:** `app/infrastructures/`

### **Role:**
- Implements repositories that interact with databases.
- Manages external API integrations.
- Contains low-level system operations.

### **Example (`repositories/user_repository.py`):**
```python
from app.domain.entities.user import User

class UserRepository:
    @staticmethod
    def get_user_by_email(email: str) -> User:
        # This should interact with a real database
        fake_user = User(id=1, email=email, name="Test User", hashed_password="hashedpass")
        return fake_user
```

---

## **6. Schemas Layer (Data Transfer Objects - DTOs)**
**Folder:** `app/schemas/`

### **Role:**
- Defines how data is structured between layers.
- Ensures consistency and validation.

### **Example (`user_schema.py`):**
```python
from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
```

---

## **How Everything Works Together**
1. **API (Routers)** receives an HTTP request and sends it to the **Controller**.
2. **Controller** processes the request and calls the **Service**.
3. **Service** executes business logic and calls the **Repository** if needed.
4. **Repository (Infrastructure Layer)** fetches data from the database or external APIs.
5. **Service** returns the response to the **Controller**, which sends it back to the API.

---

## **Why Use Clean Architecture?**
✅ **Separation of Concerns** - Each layer has a specific responsibility.
✅ **Scalability** - Business logic is independent of frameworks and databases.
✅ **Testability** - Easier to write unit tests for each layer.
✅ **Maintainability** - Code is easier to modify without affecting unrelated parts.

By following this structure, we ensure that **PantryPal** remains modular, testable, and scalable. 🚀

