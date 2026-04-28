from app.core import config

from fastapi import FastAPI
from app.routes import incidents
from app.services.simulator import generate_logs
from app.services.processor import process_logs
from app.core.state import queue, results
import asyncio

app = FastAPI(title="Sentinel AI")

app.include_router(incidents.router)

@app.get("/")
def root():
    return {"status": "Sentinel AI running"}

@app.on_event("startup")
async def startup():
    asyncio.create_task(generate_logs(queue))
    asyncio.create_task(process_logs(queue, results))