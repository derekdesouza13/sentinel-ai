from fastapi import APIRouter
from app.main import results

router = APIRouter()

results = []

@router.get("/incidents")
def get_incidents():
    return results