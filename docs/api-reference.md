```markdown
# API Reference

Messages are exchanged in JSON format.

## Example Schema
```json
{
  "device_id": "scentience-robot-01",
  "timestamp": "2025-08-29T21:00:00Z",
  "scent_data": {
    "compound": "ethanol",
    "intensity": 0.72,
    "unit": "ppm"
  }
}
Supported Fields
device_id: Unique identifier of the device
timestamp: ISO 8601 timestamp
scent_data.compound: Chemical compound detected
scent_data.intensity: Signal strength (0–1)
scent_data.unit: Measurement unit (ppm, mg/m³, etc.)