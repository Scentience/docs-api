---
layout: default
title: Contact
---

# Scentience Bluetooth API

This document provides developers with instructions on how to interface with Scentience olfaction devices using Bluetooth Low Energy (BLE) via the GATT protocol. These devices allow for programmatic control of scent emission and related features, enabling integration into applications such as robotics platforms, virtual reality experiences, or other olfactory applications.

The Scentience Bluetooth API is built to interface with Python as a PyPi package, C++ as a Conan package, React Native as an NPM package, and Rust as a Cargo package.


## Introduction

Scentience olfaction devices communicate over BLE using the GATT (Generic Attribute Profile) protocol. To interact with a device, you'll need:
- A **developer key**: A unique authentication token provided by Scentience upon registration.
- A **characteristic UUID**: The specific UUID for the primary read/write characteristic used for sending and receiving commands.

Commands and responses are exchanged as structured JSON payloads over this characteristic. This guide assumes familiarity with BLE concepts and programming in a language that supports BLE.

## Prerequisites

- **BLE-Capable Hardware**: A device with Bluetooth 4.0+ support.
- **Developer Key**: Obtain this from the Scentience developer portal (e.g., via API registration). Example: `your-developer-key-here`.
- **Characteristic UUID**: Use the following UUID for the primary command characteristic: `0000abcd-0000-1000-8000-00805f9b34fb` (replace with the actual UUID provided by Scentience if different).

Ensure your app has BLE permissions enabled (e.g., location permissions on Android for scanning).

## **Connecting with Python**

1. Install the Scentience PyPi package:

```bash
pip install scentience
```

2. Import the Scentience package:

```python
import scentience as scn
```

3. Initialize and connect a Scentience device.
Note that the typical GATT procedure involves scanning for peripherals, filtering those peripherals according to manufacturer ID or some other key,iterating through services, and authenticating.
The Scentience Bluetooth API handles all of this automatically.

```python
# Initialize a device
device = scn.ScentienceDevice(api_key=<YOUR_API_KEY>)

# Scan services and connect the device
device.connect_ble(char_uuid=<YOUR_CHAR_UUID>)

"""
Note that if multiple devices are present, you can select which device to connect to 
 by specifying the `device_uid` parameter as a string
The device UID is also the serial number.
"""
device.connect_ble(
  char_uuid=<YOUR_CHAR_UUID>, 
  device_uid=<YOUR_DEVICE_UID>
  )
```

Note that the device will connect to the default service UUID. 

4. Sample from the device sensors.
Note that there are both asynchronous and synchronous options, depending on your application.

```python
# Sample once from the device sensors
device.sample_ble(async=True)

# Or, stream data from the olfaction sensors
device.stream_ble(async=True)
```

---

## **Connecting with C++ (BLE)**

1. Install the Scentience package (choose your package manager):

```bash
# Using Conan
conan install scentience/1.0.0@

# Or, using vcpkg
vcpkg install scentience
```

2. Include the Scentience header:

```cpp
#include <scentience/scentience.h>
using namespace scn;
```

3. Initialize and connect a Scentience device.
   Note that the typical GATT procedure involves scanning for peripherals, filtering by manufacturer ID or other keys, iterating through services, and authenticating.
   The Scentience BLE API handles all of this automatically.

```cpp
// Initialize a device
ScentienceDevice device("<YOUR_API_KEY>");

// Scan services and connect the device
device.connect_ble("<YOUR_CHAR_UUID>");

// Or, connect to a specific device UID (serial number)
device.connect_ble("<YOUR_CHAR_UUID>", "<YOUR_DEVICE_UID>");
```

The device will connect to the default service UUID.

4. Sample from the device sensors:

```cpp
// Sample once from the device sensors
device.sample_ble(true); // async = true

// Stream olfaction sensor data
device.stream_ble(true);
```

---

## **Connecting with Rust (BLE)**

1. Add the Scentience crate:

```bash
cargo add scentience
```

2. Import the crate:

```rust
use scentience::ScentienceDevice;
```

3. Initialize and connect a Scentience device.
   The typical GATT procedure (scan → filter → iterate services → authenticate) is abstracted by the Scentience BLE API.

```rust
// Initialize a device
let mut device = ScentienceDevice::new("<YOUR_API_KEY>");

// Scan services and connect
device.connect_ble("<YOUR_CHAR_UUID>");

// Or, connect to a specific device UID
device.connect_ble_with_uid("<YOUR_CHAR_UUID>", "<YOUR_DEVICE_UID>");
```

The device will connect to the default service UUID.

4. Sample from the device sensors:

```rust
// Sample once
device.sample_ble(true); // async = true

// Stream data
device.stream_ble(true);
```

---

## **Connecting with React (BLE)**

1. Install the Scentience package:

```bash
npm install scentience
```

2. Import the Scentience package:

```jsx
import { ScentienceDevice } from "scentience";
```

3. Initialize and connect a Scentience device.
   The typical GATT workflow (scan → filter → iterate → authenticate) is handled automatically by the Scentience BLE API.

```jsx
// Initialize a device
const device = new ScentienceDevice("<YOUR_API_KEY>");

// Scan services and connect
device.connectBLE({ charUuid: "<YOUR_CHAR_UUID>" });

// Or, connect to a specific device UID
device.connectBLE({
  charUuid: "<YOUR_CHAR_UUID>",
  deviceUid: "<YOUR_DEVICE_UID>",
});
```

The device will connect to the default service UUID.

4. Sample from the device sensors:

```jsx
// Sample once from the device sensors
device.sampleBLE({ async: true });

// Stream olfaction sensor data
device.streamBLE({ async: true });
```

**Full React example (in a component):**

```jsx
import { useEffect } from "react";
import { ScentienceDevice } from "scentience";

export default function App() {
  useEffect(() => {
    const device = new ScentienceDevice("<YOUR_API_KEY>");
    device.connectBLE({ charUuid: "<YOUR_CHAR_UUID>" });
    device.sampleBLE({ async: true });
    device.streamBLE({ async: true });
  }, []);

  return <h1>Scentience BLE Connected</h1>;
}
```

---

## GATT Services and Characteristics

For all APIs, the device exposes the following via GATT protocol:

- **Service UUID**: Scentience proprietary service UUID
  - **Command Characteristic**:
    - UUID: Scentience proprietary.
    - Properties: Read, Write, Notify
    - Used for sending JSON commands and receiving responses.
  - **Status Characteristic** (Optional):
    - UUID: Scentience proprietary
    - Properties: Notify
    - Subscribe to receive device status updates (e.g., battery level).

Enable notifications on the command characteristic to receive asynchronous responses.


---

## API Message Format
### Response Schema
The API communicates through JSON messages for easy parsing.
Environmental parameters are prefixed with the `ENV_` string.
Battery parameters are prefixed with the `BATT_` string.
Olfactory data have no prefixed and each are keyed with their appropriate chemical abbreviations.
Note that _all_ chemical compounds identified within a sample will send with every broadcast.
If a chemical compound's magnitude is not greater than zero, it will not send with the broadcast.
The device UID and timestamp are given to help with multiplexing multiple Scentience devices together.

Example schema:
```json
{
  "UID": "SCN001",
  "TIMESTAMP": "2025-08-29T21:00:00Z",
  "ENV_temperatureC":0,
  "ENV_humidity":0,
  "ENV_pressureHpa":1010,
  "STATUS_opuA":0,
  "BATT_health":98,
  "BATT_v":4.5,
  "BATT_charge":83,
  "BATT_time":2,
  "CO2":0,
  "NH3":270,
  "NO":6.23,
  "NO2":6.23,
  "CO":1275,
  "C2H5OH":409,
  "H2":152,
  "CH4":410,
  "C3H8":917,
  "C4H10":917,
  "H2S":2581,
  "HCHO":2584,
  "SO2":1261,
  "VOC":2917
  }
```

Payloads must be <= 512 bytes (BLE MTU limit; fragment if larger, but avoid for simplicity).

Additional actions may be added in future firmware updates; check the Scentience API changelog and release notes.

### Request Schema

Coming soon.




---
---
---
---
---