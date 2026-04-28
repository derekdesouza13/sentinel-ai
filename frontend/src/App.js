import { useEffect, useState } from "react";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
const ws = new WebSocket("ws://127.0.0.1:8000/ws");
console.log("Connecting to:", ws.url);
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setStatus("Connected");
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      const data = JSON.parse(event.data);
      setIncidents(prev => [data, ...prev]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("Error");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setStatus("Disconnected");
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚨 Sentinel AI - Live Incidents</h1>
      <p>Status: {status}</p>

      {incidents.length === 0 ? (
        <p>No incidents yet...</p>
      ) : (
        incidents.map((item, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px"
          }}>
            <p><b>Log:</b> {item.log}</p>
            <pre>{item.analysis}</pre>
          </div>
        ))
      )}
    </div>
  );
}

export default App;