import asyncio
from app.services.simulator import generate_logs
from app.services.processor import process_logs
from app.core import config
queue = asyncio.Queue()
results = []

@app.on_event("startup")
async def startup():
    asyncio.create_task(generate_logs(queue))
    asyncio.create_task(process_logs(queue, results))