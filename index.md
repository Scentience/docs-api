---
layout: default
title: Home
---

# Scentience WebSocket API
---
The Scentience WebSocket API provides real-time communication between Scentience devices, the Scentience mobile app, and other robots or olfactory-enabled systems.
Enabled to interface with nearly any application and programming language, this API enables seamless exchange of olfactory information over a lightweight, bidirectional WebSocket protocol.
Features
- Real-time Communication – Stream olfactory data with minimal latency.
- Robot Integration – Allow robots and IoT devices to access scent information.
- App Relay – The Scentience app can act as a hub, relaying olfactory signals between devices.
- Lightweight & Efficient – Built with GCD sockets for high performance and scalability.
- Cross-Platform Ready – Any WebSocket-compatible client can connect (Python, JavaScript, C++, etc.).
---
Getting Started
1. Clone the Repository
```
git clone https://github.com/scentience/docs-api-sockets.git
cd scentience-ws-api
```
2. Run the Server
The WebSocket server is written in Swift and uses GCD for concurrency.
To run the server:
swift run
By default, the server runs on ws://localhost:8080.
📡 Example Usage
### Connecting with Swift
```
let url = URL(string: "ws://localhost:8080")!
let task = URLSession.shared.webSocketTask(with: url)
task.resume()

// Send a test message
let message = URLSessionWebSocketTask.Message.string("Hello from Scentience")
task.send(message) { error in
    if let error = error {
        print("Error sending: \(error)")
    }
}
```
### Connecting with Python
```
import websockets
import asyncio

async def main():
    async with websockets.connect("ws://localhost:8080") as ws:
        await ws.send("Hello from Python client")
        response = await ws.recv()
        print(response)

asyncio.run(main())
```

🔧 API Messages
The API supports JSON messages for easy parsing.
Example schema:
```
{
  "device_id": "scentience-robot-01",
  "timestamp": "2025-08-29T21:00:00Z",
  "scent_data": {
    "compound": "ethanol",
    "intensity": 0.72,
    "unit": "ppm"
  }
}
```
🧩 Integration Ideas
Connect Scentience sensors to drones, mobile robots, or industrial platforms.
Stream scent profiles into research dashboards.
Relay olfactory data between multiple Scentience apps.
📖 Documentation
Full documentation (setup, examples, API schema) is available at:
👉 https://your-username.github.io/scentience-ws-api
🤝 Contributing
We welcome contributions! Please open issues, submit PRs, or propose features.
📜 License
This project is licensed under the MIT License – see LICENSE for details.

