---
layout: default
title: Contact
---

# Scentience UAV Sockets API

The Scentience UAV Sockets API, just like the regular Sockets API, is built to interface with Python as a PyPi package, C++ and React Native as source packages, and Rust as a Cargo package.

The Scentience UAV Sockets API is your gateway to seamless UAV communication with olfactory sensors. 
This WebSockets-based API mirrors the familiar structure of the other UAV SDKs. 
Through Wi-Fi and UDP, your commands and data flow smoothly between your control system and our drones.

---

## Architecture

Scentience operates through a UDP connection over WebSockets:

| Endpoint                   | Purpose                                                                      |
| -------------------------- | ---------------------------------------------------------------------------- |
| `ws://<drone-ip>:8889`     | Send control commands and receive immediate responses (e.g., `ok`, `error`). |
| `ws://<your-app-ip>:8890`  | Listen for state updates (battery, flight time, attitude, etc.).             |
| `ws://<your-app-ip>:11111` | Receive live video streaming data.                                           |

**Setup sequence:**

1. Initialize a WebSocket client to connect to the drone’s `8889` port.
2. Send the command `"hello_scentience"` to activate SDK mode.
3. Listen on your own WebSocket server at `8890` for asynchronous state messages.
4. Optionally, open your WebSocket server at `11111` to receive streaming video once you activate it.

---

## Activating the API

```plaintext
hello_scentience
```

* **What it does**: Activates the Scentience SDK and validates your connection.
* **Response**: `ok` if success, otherwise `error`.

Once confirmed, you're free to use all other supported commands!

---

## Command Types & Responses

Scentience supports three distinct command types:

* **Control Commands** — e.g., `takeoff`, `land`, `streamon`
  → **Response**: `ok` or `error`

* **Set Commands** — e.g., `speed 50`, `ssid MyNet pass 12345678`
  → **Response**: `ok` or `error`

* **Read Commands** — append `?` like `battery?`, `time?`
  → **Response**: Returns requested value (e.g., percentage, seconds)

---

## Command Reference Table

### Control Commands

| Command                         | Description                            | Response       |
| ------------------------------- | -------------------------------------- | -------------- |
| `hello_scentience`              | Enter SDK mode                         | `ok` / `error` |
| `takeoff`                       | Auto-takeoff                           | `ok` / `error` |
| `land`                          | Auto-landing                           | `ok` / `error` |
| `streamon`                      | Start video stream                     | `ok` / `error` |
| `streamoff`                     | Stop video stream                      | `ok` / `error` |
| `emergency`                     | Immediate motor stop                   | `ok` / `error` |
| `stop`                          | Hover in place                         | `ok` / `error` |
| `up x`                          | Climb `x` cm (20–500)                  | `ok` / `error` |
| `down x`                        | Descend `x` cm (20–500)                | `ok` / `error` |
| `left x`                        | Fly left `x` cm (20–500)               | `ok` / `error` |
| `right x`                       | Fly right `x` cm (20–500)              | `ok` / `error` |
| `forward x`                     | Fly forward `x` cm (20–500)            | `ok` / `error` |
| `back x`                        | Fly backward `x` cm (20–500)           | `ok` / `error` |
| `cw x`                          | Rotate clockwise `x°` (1–360)          | `ok` / `error` |
| `ccw x`                         | Rotate counterclockwise `x°` (1–360)   | `ok` / `error` |
| `flip [l/r/f/b]`                | Flip left, right, forward, or back     | `ok` / `error` |
| `go x y z speed`                | Fly to position at speed               | `ok` / `error` |
| `curve x1 y1 z1 x2 y2 z2 speed` | Fly in a curve between two waypoints   | `ok` / `error` |
| `oioon`                         | Begin navigating by scent via OIO      | `ok` / `error` |
| `oiooff`                        | End navigating by scent via OIO        | `ok` / `error` |
| `oio x`                         | Track target compound `x` (e.g. `nh3`) | `ok` / `error` |

**Note**: 
Sending `oio x` will automatially activate `oioon` to start tracking the target compound through olfactory inertial odometery (OIO).

---

### Set Commands

| Command                         | Description                                      | Response       |
| ------------------------------- | ------------------------------------------------ | -------------- |
| `speed x`                       | Set cruise speed (10–100 cm/s)                   | `ok` / `error` |
| `rc a b c d`                    | Direct RC control — (`-100`–`100` each axis)     | `ok` / `error` |
| `ssid YOUR_SSID pass YOUR_PASS` | Configure drone Wi-Fi credentials                | `ok` / `error` |
| `mdirection x`                  | Set detection direction: 0=down, 1=front, 2=both | `ok` / `error` |
| `ap YOUR_SSID YOUR_PASS`        | Configure station mode for Wi-Fi                 | `ok` / `error` |

---

### Read Commands

| Command    | Description                | Example Response   |
| ---------- | -------------------------- | ------------------ |
| `speed?`   | Current speed setting      | `20`               |
| `battery?` | Battery percentage         | `75`               |
| `time?`    | Flight time in seconds     | `115`              |
| `wifi?`    | Wi-Fi signal quality (SNR) | `21`               |
| `gps?`     | GPS signal quality (SNR)   | `21`               |
| `ble?`     | BLE signal quality (SNR)   | `21`               |
| `pos?`     | Current position           | `36.0000, 48.9994` |
| `sdk?`     | SDK version                | `1.0.0-scentience` |
| `sn?`      | OPU serial number          | `SCN00001`         |
| `olfa?`    | Olfactory sensor A (ppb)   | `2000`             |
| `olfb?`    | Olfactory sensor B (ppb)   | `2000`             |

---

## Streaming & State Reception

Once `streamon` is issued, your client listening on `11111` will begin receiving video frames, typically encoded in H.264. Frame interpretation is up to your application logic.

On the state side, keep listening via port `8890` for periodic updates such as battery, flight time, and kinematic oriented data.

---
## Scentience UAV State

**Data type**: String

```
pitch:%d;roll:%d;yaw:%d;vgx:%d;vgy:%d;vgz:%d;templ:%d;temph:%d;tof:%d;h:%d;bat:%d;baro:%.2f;time:%d;agx:%.2f;agy:%.2f;agz:%.2f;

```

### Field Descriptions

| Field         | Meaning                                                                 |
|---------------|-------------------------------------------------------------------------|
| `olfa`        | Measurements from olfactory sensor a.                                   |
| `olfb`        | Measurements from olfactory sensor b.                                   |
| `x`, `y`, `z` | Coordinates of the home. `0` if no home position is detected.           |
| `pitch`       | Attitude pitch in degrees.                                              |
| `roll`        | Attitude roll in degrees.                                               |
| `yaw`         | Attitude yaw in degrees.                                                |
| `vgx`         | Speed along the X-axis.                                                 |
| `vgy`         | Speed along the Y-axis.                                                 |
| `vgz`         | Speed along the Z-axis.                                                 |
| `templ`       | Lowest temperature in °C.                                               |
| `temph`       | Highest temperature in °C.                                              |
| `tof`         | Time-of-flight distance in cm.                                          |
| `h`           | Height in cm.                                                           |
| `bat`         | Current battery level in percentage.                                    |
| `baro`        | Barometer measurement in cm.                                            |
| `time`        | Duration (in seconds) motors have been engaged.                         |
| `agx`         | Acceleration along the X-axis.                                          |
| `agy`         | Acceleration along the Y-axis.                                          |
| `agz`         | Acceleration along the Z-axis.                                          |

---

## Sample Session Flow

```plaintext
[ Take off and initialize sensors ]

> hello_scentience
< ok

> takeoff
< ok

> battery?
< 80

> speed 50
< ok

> go 100 0 50 30
< ok

[ Start scent navigation and track ammonia (NH3) ]

> oioon
< ok

> oio nh3
< ok

[ Start receiving video on port 11111 ]

> streamon
< ok

> streamoff
< ok

> oiooff
< ok

[ End all ]

> land
< ok
```


---
---
---
---
---