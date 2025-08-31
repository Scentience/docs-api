---
layout: default
title: Contact
---

# Scentience Sockets API Guide

### Connecting with Swift
```python
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
---
### Connecting with Python
```python
import websockets
import asyncio

async def main():
    async with websockets.connect("ws://localhost:8080") as ws:
        await ws.send("Hello from Python client")
        response = await ws.recv()
        print(response)

asyncio.run(main())
```

### API Messages
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