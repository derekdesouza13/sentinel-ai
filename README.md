# 🚨 Sentinel AI — Real-Time Incident Detection System

A real-time monitoring system inspired by distributed event-driven architectures, capable of ingesting, processing, and streaming high-frequency incident data with AI-based classification.

---

## ⚡ Overview

Sentinel AI simulates a production-grade incident detection pipeline:

- Continuous log ingestion
- Asynchronous event processing
- AI-based classification (severity + category)
- Real-time streaming to frontend via WebSockets
- Interactive monitoring dashboard

---

## 🧠 System Architecture


[ Log Simulator ]
↓
[ Async Queue (Event Buffer) ]
↓
[ Processing Layer (Workers) ]
↓
[ AI Classification Layer ]
↓
[ WebSocket Streaming ]
↓
[ React Dashboard ]


---

## 🚀 Features

### 🔄 Real-Time Streaming
- WebSocket-based push system (no polling)
- Live updates every second

### ⚙️ Async Processing Pipeline
- Queue-based architecture using `asyncio`
- Simulates distributed event processing

### 🤖 AI-Based Classification
- Classifies logs into:
  - Severity (High / Medium / Low)
  - Category (System / Network / Security)

### 📊 Interactive Dashboard
- Live incident feed
- Severity-based color coding
- Metrics panel (High / Medium / Low counts)
- Search & filtering functionality

### 🎯 Scalable Design
- Decoupled architecture (ingestion, processing, delivery)
- Easily extendable to Kafka / Redis Streams

---

## 🛠️ Tech Stack

**Backend**
- Python
- FastAPI
- AsyncIO

**Frontend**
- React.js
- Framer Motion

**Other**
- WebSockets (real-time communication)

---

## 📸 Demo

> Live incident dashboard updating in real-time



---

## 🧪 Running Locally

### 1️⃣ Backend

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### 2️⃣  Frontend

cd frontend
npm install
npm start

# 💡 Key Engineering Highlights

Designed a real-time event-driven system
Implemented asynchronous pipelines for high-throughput processing
Used WebSockets for low-latency streaming
Built with a modular, scalable architecture
Simulated distributed system behavior locally

# 🔥 What Makes This Stand Out

Unlike typical CRUD projects, Sentinel AI demonstrates:

System design thinking
Real-time data handling
Event-driven architecture
Production-style frontend + backend integration

# 📈 Future Improvements
Kafka integration for real streaming pipelines
Redis for distributed state management
Alerting system (Slack / Email simulation)
Deployment on AWS (EC2 + WebSocket scaling)

# ⭐ Final Note

This project was built to simulate how real-world monitoring systems operate at scale — focusing on performance, architecture, and real-time behavior.