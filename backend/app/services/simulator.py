import asyncio
import random

logs = [
    "Database connection timeout",
    "Unauthorized login attempt detected",
    "High CPU usage on server",
    "Service outage in region us-east",
    "Disk nearing full capacity"
]

async def generate_logs(queue):
    while True:
        log = random.choice(logs)
        await queue.put(log)
        await asyncio.sleep(1)