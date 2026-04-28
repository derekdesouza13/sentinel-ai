import asyncio
from app.services.ai_service import classify_incident

async def process_logs(queue, results):

    while True:
        log = await queue.get()

        analysis = classify_incident(log)

        results.append({
            "log": log,
            "analysis": analysis
        })

        print("Processed:", log)