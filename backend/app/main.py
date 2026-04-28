from app.core import config

from fastapi import FastAPI, WebSocket
from app.routes import incidents
from app.services.simulator import generate_logs
from app.services.processor import process_logs
from app.core.state import queue, results, clients
import asyncio

app = FastAPI(title="Sentinel AI")

app.include_router(incidents.router)

@app.get("/")
def root():
    return {"status": "Sentinel AI running"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("⚡ WebSocket connection request received")

    await websocket.accept()
    print("✅ WebSocket connected")

    clients.append(websocket)

    try:
        while True:
            await asyncio.sleep(1)
    except Exception as e:
        print("❌ WebSocket error:", e)
        clients.remove(websocket)
        print("🔌 WebSocket disconnected")

# ✅ STARTUP
@app.on_event("startup")
async def startup():
    asyncio.create_task(generate_logs(queue))
    asyncio.create_task(process_logs(queue, results))