from fastapi import APIRouter

router = APIRouter()

results = []

@router.get("/incidents")
def get_incidents():
    return results