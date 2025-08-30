---
layout: default
title: Contact
---

# Scentience UAV Sockets API Guide

**Version 1.0 – Scentience**

---

## Introduction

Welcome to **Scentience**—your gateway to seamless UAV communication. 
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

| Command                         | Description                          | Response       |
| ------------------------------- | ------------------------------------ | -------------- |
| `hello_scentience`              | Enter SDK mode                       | `ok` / `error` |
| `takeoff`                       | Auto-takeoff                         | `ok` / `error` |
| `land`                          | Auto-landing                         | `ok` / `error` |
| `streamon`                      | Start video stream                   | `ok` / `error` |
| `streamoff`                     | Stop video stream                    | `ok` / `error` |
| `emergency`                     | Immediate motor stop                 | `ok` / `error` |
| `stop`                          | Hover in place                       | `ok` / `error` |
| `up x`                          | Climb `x` cm (20–500)                | `ok` / `error` |
| `down x`                        | Descend `x` cm (20–500)              | `ok` / `error` |
| `left x`                        | Fly left `x` cm (20–500)             | `ok` / `error` |
| `right x`                       | Fly right `x` cm (20–500)            | `ok` / `error` |
| `forward x`                     | Fly forward `x` cm (20–500)          | `ok` / `error` |
| `back x`                        | Fly backward `x` cm (20–500)         | `ok` / `error` |
| `cw x`                          | Rotate clockwise `x°` (1–360)        | `ok` / `error` |
| `ccw x`                         | Rotate counterclockwise `x°` (1–360) | `ok` / `error` |
| `flip [l/r/f/b]`                | Flip left, right, forward, or back   | `ok` / `error` |
| `go x y z speed`                | Fly to position at speed             | `ok` / `error` |
| `curve x1 y1 z1 x2 y2 z2 speed` | Fly in a curve between two waypoints | `ok` / `error` |

**Note**: For `go` and `curve`, `x`, `y`, `z` must be between -500 and 500, except avoid simultaneous values between -20..20. Speeds:

* `go`: 10–100 cm/s
* `curve`: 10–60 cm/s

---

### Set Commands

| Command                         | Description                                      | Response       |
| ------------------------------- | ------------------------------------------------ | -------------- |
| `speed x`                       | Set cruise speed (10–100 cm/s)                   | `ok` / `error` |
| `rc a b c d`                    | Direct RC control — (`-100`–`100` each axis)     | `ok` / `error` |
| `ssid YOUR_SSID pass YOUR_PASS` | Configure drone Wi-Fi credentials                | `ok` / `error` |
| `mon`                           | Enable mission pad detection                     | `ok` / `error` |
| `moff`                          | Disable mission pad detection                    | `ok` / `error` |
| `mdirection x`                  | Set detection direction: 0=down, 1=front, 2=both | `ok` / `error` |
| `ap YOUR_SSID YOUR_PASS`        | Configure station mode for Wi-Fi                 | `ok` / `error` |

> **Tip**: Use `mon` before setting `mdirection`. Detection rates vary based on mode.

---

### Read Commands

| Command    | Description                | Example Response   |
| ---------- | -------------------------- | ------------------ |
| `speed?`   | Current speed setting      | `50`               |
| `battery?` | Battery percentage         | `85`               |
| `time?`    | Flight time in seconds     | `120`              |
| `wifi?`    | Wi-Fi signal quality (SNR) | `30`               |
| `sdk?`     | SDK version                | `1.0.0-scentience` |
| `sn?`      | Drone serial number        | `SC12345678`       |

---

## Streaming & State Reception

Once `streamon` is issued, your client listening on `11111` will begin receiving video frames, typically encoded in H.264. Frame interpretation is up to your application logic.

On the state side, keep listening via port `8890` for periodic updates such as battery, flight time, and mission pad orientation—especially when `mon` or similar commands are active.

---

## Sample Session Flow

```plaintext
> hello_scentience
< ok

> speed 50
< ok

> takeoff
< ok

> battery?
< 80

> go 100 0 50 30
< ok

[ Drone navigates ]

> curve 100 0 50 200 0 50 20
< ok

> land
< ok

> streamon
< ok

[ Start receiving video on port 11111 ]

> streamoff
< ok
```

---