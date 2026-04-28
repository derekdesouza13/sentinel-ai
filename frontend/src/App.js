import { useEffect, useState } from "react";

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setIncidents(prev => [data, ...prev]);
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚨 Sentinel AI - Live Incidents</h1>

      {incidents.map((item, index) => (
        <div key={index} style={{
          border: "1px solid #ccc",
          margin: "10px 0",
          padding: "10px"
        }}>
          <p><b>Log:</b> {item.log}</p>
          <pre>{item.analysis}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;