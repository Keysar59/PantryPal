import fastapi

router = fastapi.APIRouter()


@router.get("/products/{group_id}")
async def get_products(group_id: str):
    return {"group_id": group_id}
