---
layout: default
title: Contact
---

# Scentience Bluetooth API Guide

This document provides developers with instructions on how to interface with Scentience olfaction devices using Bluetooth Low Energy (BLE) via the GATT protocol. These devices allow for programmatic control of scent emission and related features, enabling integration into applications such as smart home systems, virtual reality experiences, or aromatherapy apps.

## Introduction

Scentience olfaction devices communicate over BLE using the GATT (Generic Attribute Profile) protocol. To interact with a device, you'll need:
- A **developer key**: A unique authentication token provided by Scentience upon registration.
- A **characteristic UUID**: The specific UUID for the primary read/write characteristic used for sending and receiving commands.

Commands and responses are exchanged as structured JSON payloads over this characteristic. This guide assumes familiarity with BLE concepts and programming in a language that supports BLE (e.g., Swift for iOS, Kotlin/Java for Android, or libraries like Noble for Node.js).

## Prerequisites

- **BLE-Capable Hardware**: A device with Bluetooth 4.0+ support.
- **Developer Key**: Obtain this from the Scentience developer portal (e.g., via API registration). Example: `your-developer-key-here`.
- **Characteristic UUID**: Use the following UUID for the primary command characteristic: `0000abcd-0000-1000-8000-00805f9b34fb` (replace with the actual UUID provided by Scentience if different).
- **Service UUID**: The device exposes a custom GATT service with UUID `00001234-0000-1000-8000-00805f9b34fb`.
- **Libraries/Tools**:
  - iOS: CoreBluetooth framework.
  - Android: Android Bluetooth APIs.
  - Cross-platform: Libraries like `bleak` (Python) or `react-native-ble-plx` (React Native).

Ensure your app has BLE permissions enabled (e.g., location permissions on Android for scanning).

## Connecting to the Device

1. **Scan for Devices**:
   - Scan for BLE peripherals advertising the Scentience service UUID.
   - Look for devices with a name prefix like `Scentience-` or a specific manufacturer data.

   Example in Python using `bleak`:
   ```python
   import asyncio
   from bleak import BleakScanner, BleakClient

   async def scan():
       devices = await BleakScanner.discover()
       for device in devices:
           if device.name and device.name.startswith("Scentience-"):
               return device.address
       return None

   device_address = asyncio.run(scan())
   ```

2. **Connect and Discover Services**:
   - Establish a connection to the device.
   - Discover the GATT service and the command characteristic.

   Example continuation in Python:
   ```python
   SERVICE_UUID = "00001234-0000-1000-8000-00805f9b34fb"
   COMMAND_CHAR_UUID = "0000abcd-0000-1000-8000-00805f9b34fb"

   async def connect(address):
       async with BleakClient(address) as client:
           services = await client.get_services()
           for service in services:
               if service.uuid == SERVICE_UUID:
                   for char in service.characteristics:
                       if char.uuid == COMMAND_CHAR_UUID:
                           # Characteristic found; ready to use
                           pass
   ```

3. **Authenticate**:
   - Upon connection, send an authentication command including your developer key (see Message Format below).

## GATT Services and Characteristics

The device exposes the following:

- **Service UUID**: `00001234-0000-1000-8000-00805f9b34fb` (Custom Scentience Service)
  - **Command Characteristic**:
    - UUID: `0000abcd-0000-1000-8000-00805f9b34fb`
    - Properties: Read, Write, Notify
    - Used for sending JSON commands and receiving responses.
  - **Status Characteristic** (Optional):
    - UUID: `0000efgh-0000-1000-8000-00805f9b34fb`
    - Properties: Notify
    - Subscribe to receive device status updates (e.g., battery level).

Enable notifications on the command characteristic to receive asynchronous responses.

## Message Format

All communications use UTF-8 encoded JSON payloads written to the command characteristic. The JSON structure follows this schema:

- **Request Format**:
  ```json
  {
    "action": "string",  // Command type (e.g., "authenticate", "emit_scent", "get_status")
    "key": "string",     // Your developer key (required for most actions)
    "params": {          // Action-specific parameters (object)
      // Varies by action
    },
    "timestamp": "number"  // Unix timestamp in milliseconds (optional, for logging)
  }
  ```

- **Response Format**:
  ```json
  {
    "status": "string",  // "success" or "error"
    "message": "string", // Optional description
    "data": {            // Response data (object, varies by action)
      // Varies by action
    },
    "error_code": "number"  // If status is "error" (e.g., 401 for auth failure)
  }
  ```

Payloads must be <= 512 bytes (BLE MTU limit; fragment if larger, but avoid for simplicity).

### Supported Actions

- **authenticate**:
  - Params: None (key is in root).
  - Example Request: `{"action": "authenticate", "key": "your-developer-key-here"}`
  - Response: `{"status": "success", "message": "Authenticated"}`

- **emit_scent**:
  - Params: `{"scent_id": "string", "intensity": "number" (0-100), "duration": "number" (seconds)}`
  - Example: `{"action": "emit_scent", "key": "your-key", "params": {"scent_id": "lavender", "intensity": 50, "duration": 30}}`

- **get_status**:
  - Params: None.
  - Response Data: `{"battery": 85, "connected": true, "current_scent": "none"}`

- **list_scents**:
  - Params: None.
  - Response Data: `{"scents": ["lavender", "citrus", "ocean"]}`

Additional actions may be added in future firmware updates; check the Scentience API changelog.

## Sending and Receiving Messages

1. **Serialize JSON** to bytes and write to the characteristic.
2. **Read or notify** for responses.

Example in Python (`bleak`):
```python
import json

async def send_command(client, char_uuid, command):
    payload = json.dumps(command).encode('utf-8')
    await client.write_gatt_char(char_uuid, payload)
    
    # Assuming notification enabled
    def notification_handler(sender, data):
        response = json.loads(data.decode('utf-8'))
        print(response)
    
    await client.start_notify(char_uuid, notification_handler)
    # Wait for response as needed
```

Handle errors like connection loss or invalid JSON.

## Examples

### Full Authentication and Command Flow (Pseudo-code)

```pseudocode
Scan for device
Connect to device
Discover service and characteristic
Send authenticate: {"action": "authenticate", "key": "your-key"}
Wait for response: {"status": "success"}
Send emit_scent: {"action": "emit_scent", "key": "your-key", "params": {"scent_id": "rose", "intensity": 70, "duration": 60}}
Receive response: {"status": "success", "data": {"emitted": true}}
Disconnect
```

### Error Handling

- If response `status` is "error":
  - 400: Invalid JSON.
  - 401: Invalid key.
  - 404: Unknown action.
- Retry connections on BLE errors.

## Security Considerations

- Use HTTPS for obtaining developer keys.
- Avoid hardcoding keys in production apps.
- Ensure BLE communication is encrypted (pairing may be required).

## Troubleshooting

- Device not found: Ensure BLE is enabled and device is powered on.
- Write failures: Check MTU and fragment large payloads.
- Contact Scentience support for firmware issues.

For updates, visit the Scentience developer portal. This is a draft document—feedback welcome!





---
---

---