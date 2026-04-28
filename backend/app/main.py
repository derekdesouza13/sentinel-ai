from app.core import config

from fastapi import FastAPI
from app.routes import incidents
from app.services.simulator import generate_logs
from app.services.processor import process_logs
import asyncio

# ✅ CREATE APP FIRST
app = FastAPI(title="Sentinel AI")

app.include_router(incidents.router)

@app.get("/")
def root():
    return {"status": "Sentinel AI running"}


# ✅ SHARED STATE
queue = asyncio.Queue()
results = []

# ✅ STARTUP EVENT AFTER app IS DEFINED
@app.on_event("startup")
async def startup():
    asyncio.create_task(generate_logs(queue))
    asyncio.create_task(process_logs(queue, results))