---
layout: default
title: Contact
---

# Scentience Sockets API

The Scentience Sockets API is built to interface with Python as a PyPi package, C++ as a Conan package, React Native as an NPM package, and Rust as a Cargo package.
---
### Connecting with Python

1. Install the Scentience PyPi package:

```bash
pip install scentience
```

2. Import the Scentience package:

```python
import scentience as scn
```

3. Initialize and connect a Scentience device,

```python
# Initialize a device
device = scn.ScentienceDevice(api_key=<YOUR_API_KEY>)

# Connect the device
device.connect_socket()

"""
Note that if multiple devices are present, you can select which device to connect to 
 by specifying the `device_uid` parameter as a string
The device UID is also the serial number.
"""
device.connect_socket(device_uid=<YOUR_DEVICE_UID>)
```

Note that the device will connect to the default IP Address of `192.168.10.1`. 
To change this, you can add IP address and port arguments like below:
```python
device.connect_socket(
  device_uid=<YOUR_DEVICE_UID>,
  ip_address=<YOUR_IP_ADDRESS>,
  port=<YOUR_IP_PORT>
  )
```

4. Sample from the device sensors.
Note that there are both asynchronous and synchronous options, depending on your application.

```python
# Sample once from the device sensors
device.sample(async=True)

# Or, stream data from the olfaction sensors
device.stream(async=True)
```

---

A full test script can be found below:

```python
import scentience as scn

# Initialize a device
device = scn.ScentienceDevice(api_key=<YOUR_API_KEY>)

# Connect the device with the device UID or serial number
device.connect_socket()

# Sample once from the device sensors
device.sample(async=True)

# Or, stream data from the olfaction sensors
device.stream(async=True)
```

---

### Connecting with C++

Coming soon.

### Connecting with Rust

Coming soon.

### Connecting with React

Coming soon.

### API Messages
The API communicates through JSON messages for easy parsing.
Environmental parameters are prefixed with the `ENV_` string.
Battery parameters are prefixed with the `BATT_` string.
Olfactory data have no prefixed and each are keyed with their appropriate chemical abbreviations.
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

---
---
---
---
---