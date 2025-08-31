---
layout: default
title: Home
---
<!-- ![image info](https://scentience.github.io/docs-api/assets/logo.png) -->
<!-- <img src="https://scentience.github.io/docs-api/assets/logo.png" style="display:block;float:none;margin-left:auto;margin-right:auto;width:3%"> -->
<!-- # ![](https://scentience.github.io/docs-api/assets/logo.png =250x)  Scentience APIs  -->
# Scentience APIs
The Scentience APIs provide real-time communication between Scentience devices, the Scentience mobile app, Scentience AI models, and other robots or olfactory-enabled systems.
Enabled to interface with nearly any application and programming language, this API enables seamless exchange of olfactory information over several lightweight standard bidirectional communication protocols.

Scentience offers 4 APIs:
- **[Sockets API](https://scentience.github.io/docs-api/sockets-api)**: Communicate over web socket connections to olfactory devices, robots, or other peripherals.
- **[UAV Sockets API](https://scentience.github.io/docs-api/sockets-uav-api)** A derivative of the Sockets API purposed specifically for drone and UAV communication for [olfactory inertial odometry](https://ieeexplore.ieee.org/document/11078037).
- **[Bluetooth API](https://scentience.github.io/docs-api/ble-api)**: Quickly stream real-time communication from olfactory sensors to other nearby devices or robotic sensors.
- **[AI Model API](https://scentience.github.io/docs-api/model-cards)**: Get on-demand inference from Scentience AI models being served in the cloud.


<!-- **Features**
- Real-time Communication – Stream data from olfactory devices with minimal latency.
- Robot Integration – Allow robots and IoT devices to access olfactory information.
- App Relay – The Scentience app can act as a hub, relaying olfactory signals between devices.
- Lightweight & Efficient – Built with standard software development tools like GCD, GATT, REST, web sockets, and more for high performance and scalability.
- Cross-Platform Ready – Any capable connection through conventional cloud, application, or firmware languages (Python, JavaScript, C++, etc.). -->

---

Below are concepts around olfaction for which Scentience olfactory processing units (OPUs) can be intuitively used with the APIs.

---

### Scent-Based Navigation for Robots
Robots equipped with Scentience OPUs can use odor concentration gradients as navigation cues, much like animals do.  
By continuously sampling chemical signatures from the environment and querying the API, a robot can:
- Detect the direction of increasing odor concentration.
- Follow dynamic trails (e.g., a gas leak or a perfume plume).
- Combine olfaction with vision or LiDAR for **multimodal navigation**.

**Example use case:**  
An industrial drone locating the source of a methane leak in a factory by “sniffing” its way toward the emission point.

---

### Static Scent-Object Localization
OPUs can be used to identify **fixed scent sources** in a defined area.  
Using the API, developers can:
- Map odor intensity readings to a spatial grid.
- Triangulate the probable source of the scent using multiple sensors.
- Generate a “scent heatmap” that indicates regions of high chemical concentration.

**Example use case:**  
A warehouse robot determining which shelf contains spoiled food without needing to visually inspect each container.

---

### Scent Classification of Scenes
Scentience APIs can classify an environment by its **olfactory fingerprint**.  
When OPUs capture raw chemical signatures, the API can:
- Match them against trained models of known environments.
- Assign probabilistic labels such as *“kitchen”*, *“forest”*, or *“chemical lab”*.
- Enable context-aware decision-making in robots and IoT systems.

**Example use case:**  
A household service robot detecting it has entered a kitchen (due to a mix of cooking aromas) and adapting its task behavior accordingly.


---
---

