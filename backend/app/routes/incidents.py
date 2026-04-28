from fastapi import APIRouter
from app.core.state import results

router = APIRouter()

@router.get("/incidents")
def get_incidents():
    return results