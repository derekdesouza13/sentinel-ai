import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getSeverity(analysis) {
  if (analysis.includes("High")) return "High";
  if (analysis.includes("Medium")) return "Medium";
  return "Low";
}

function getSeverityColor(severity) {
  if (severity === "High") return "#ff4d4f";
  if (severity === "Medium") return "#faad14";
  return "#52c41a";
}

function App() {
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("Connected");
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
      fontFamily: "Inter, Arial"
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
          padding: "8px 14px",
          borderRadius: "999px",
          fontSize: "14px"
        }}>
          {status}
        </span>
      </div>

      {/* INCIDENT CONTAINER */}
      <div style={{
        maxHeight: "80vh",
        overflowY: "auto",
        paddingRight: "5px"
      }}>
        {incidents.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No incidents yet...</p>
        ) : (
          incidents.map((item, index) => {
            const severity = getSeverity(item.analysis);
            const color = getSeverityColor(severity);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#1e293b",
                  borderLeft: `5px solid ${color}`,
                  marginBottom: "15px",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}
              >

                {/* TOP ROW */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px"
                }}>
                  <p style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "15px"
                  }}>
                    {item.log}
                  </p>

                  {/* SEVERITY BADGE */}
                  <span style={{
                    background: color,
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {severity}
                  </span>
                </div>

                {/* ANALYSIS */}
                <pre style={{
                  margin: 0,
                  color: "#cbd5f5",
                  whiteSpace: "pre-wrap",
                  fontSize: "13px"
                }}>
                  {item.analysis}
                </pre>

              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;