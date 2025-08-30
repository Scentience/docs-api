```markdown
# Usage Examples

## Swift Client
```swift
let url = URL(string: "ws://localhost:8080")!
let task = URLSession.shared.webSocketTask(with: url)
task.resume()
Python Client
import websockets, asyncio

async def main():
    async with websockets.connect("ws://localhost:8080") as ws:
        await ws.send("Hello")
        print(await ws.recv())

asyncio.run(main())