---
layout: default
title: Concepts
---

# Concepts
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
