from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.api.v1.testing_router import router as testing_router
from app.api.v1.authentication_router import router as authentication_router
from app.api.v1.group_management_router import router as group_management_router
# from app.api.v1.list_management_router import router as list_management_router
# from app.api.v1.products_fetching_router import router as product_fetching_router

app = FastAPI(redoc_url="/redoc")

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(testing_router, prefix="/api/v1/testing")
app.include_router(authentication_router, prefix="/api/v1/auth")
# app.include_router(group_management_router, prefix="/api/v1/group")
# app.include_router(list_management_router, prefix="/api/v1/list")
# app.include_router(product_fetching_router, prefix="/api/v1/product_fetching")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
