from app.services.ai_service import classify_incident
from app.core.state import clients

async def process_logs(queue, results):
    while True:
        log = await queue.get()

        analysis = classify_incident(log)

        incident = {
            "log": log,
            "analysis": analysis
        }

        results.append(incident)

        # send to frontend via websocket
        for client in clients:
            await client.send_json(incident)

        print("Processed:", log)