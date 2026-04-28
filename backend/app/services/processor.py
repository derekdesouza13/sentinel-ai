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

        # ✅ SEND SAFELY TO CLIENTS
        for client in clients.copy():
            try:
                await client.send_json(incident)
            except:
                clients.remove(client)

        print("Processed:", log)