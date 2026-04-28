import { useEffect, useState } from "react";

function getSeverityColor(analysis) {
  if (analysis.includes("High")) return "#ff4d4f";
  if (analysis.includes("Medium")) return "#faad14";
  return "#52c41a";
}

function App() {
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      setStatus("🟢 Live");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setIncidents(prev => [data, ...prev]);
    };

    ws.onerror = () => {
      setStatus("🔴 Error");
    };

    ws.onclose = () => {
      setStatus("⚪ Disconnected");
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      color: "white",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: 0 }}>🚨 Sentinel AI</h1>
        <span style={{
          background: "#1e293b",
          padding: "8px 12px",
          borderRadius: "8px"
        }}>
          {status}
        </span>
      </div>

      {/* INCIDENT LIST */}
      {incidents.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No incidents yet...</p>
      ) : (
        incidents.map((item, index) => {
          const color = getSeverityColor(item.analysis);

          return (
            <div key={index} style={{
              background: "#1e293b",
              borderLeft: `5px solid ${color}`,
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                {item.log}
              </p>

              <pre style={{
                margin: 0,
                color: "#cbd5f5",
                whiteSpace: "pre-wrap"
              }}>
                {item.analysis}
              </pre>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;