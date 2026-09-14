# Getting Started

Follow this quickstart guide to get up and running with the Developer API in under 5 minutes.

## Step 1: Create a Sandbox Account

Before using production endpoints, sign up for a sandbox environment:
1. Register at the Developer Dashboard.
2. Navigate to **Keys & Credentials**.
3. Generate a **Test API Key**.

## Step 2: Make Your First Request

Test your connection using `curl`:

```bash
curl -X GET https://sandbox.example.com/v1/transfers \
  -H "Authorization: Bearer YOUR_TEST_API_KEY" \
  -H "Content-Type: application/json"
```

## Step 3: Explore Interactive Docs

Head over to the [Interactive API Reference](/api-reference) to send live requests directly from your browser.
