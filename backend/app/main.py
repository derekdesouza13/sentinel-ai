from fastapi import FastAPI
from app.routes import incidents

app = FastAPI(title="Sentinel AI")

app.include_router(incidents.router)

@app.get("/")
def root():
    return {"status": "Sentinel AI running"}