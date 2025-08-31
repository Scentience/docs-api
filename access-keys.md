---
layout: default
title: Access Keys
---

# Scentience API Access Keys
Below are the steps to obtaining your Scentience API key in order to access the Scentience Sockets, UAV-Sockets, Bluetooth, and AI Model APIs.

## Getting Your Scentience API Key

To use the Scentience API and AI services, you need a unique **API key**.  
Your API key authenticates your requests and allows Scentience to track usage, enforce limits, and keep your account secure.

---

### Step 1 — Sign in to the Scentience Dashboard
1. Go to [dashboard.scentience.ai](https://dashboard.scentience.ai).
2. Log in with your Scentience account.

**OR**

1. Download the [Scentience iOS app](https://apps.apple.com/us/app/scentience/id6741092923).
2. Login with your Scentience account

---

### Step 2 — Generate an API Key
1. Navigate to **API Keys** in the left-hand menu.
2. Click **Create New Key**.
3. Choose a name (e.g., *production app*, *testing*, *device integration*).
4. Optionally set restrictions:
   - **IP address** restrictions  
   - **Usage quota**  
   - **Expiration date**

> ⚠️ **Important:** API keys are shown only once at creation. Copy and store it securely.  
If you lose it, you’ll need to revoke and create a new key.

---

### Step 3 — Use Your API Key
Include your key in the `Authorization` header of each request:

```bash
curl -X POST https://api.scentience.ai/v1/predict \
  -H "Authorization: Bearer SCN_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"input": "sample data"}'
```

---

### Step 4 — Manage Keys

* You can **revoke** or **regenerate** a key anytime from the dashboard.
* Old keys stop working immediately after revocation.
* Each account may hold multiple active keys, so you can separate environments (dev vs. prod).

---

### Best Practices

* Keep keys **secret** — never embed them in your public code repositories.
* Use **separate keys** for different applications or environments.
* Rotate keys periodically for better security.


---
---
---
---
---

