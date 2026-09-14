# Webhooks & Events

Webhooks allow your system to receive real-time updates when key events occur (e.g., transfer completed, payment failed).

## Supported Events

| Event Name | Description |
| :--- | :--- |
| `transfer.created` | Triggered when a new transfer is initiated |
| `transfer.completed` | Triggered when funds arrive at the destination |
| `transfer.failed` | Triggered if a payout fails |

## Signature Verification

Every webhook payload includes a signature header (`X-Signature`) calculated using HMAC-SHA256:

```python
import hmac
import hashlib

def verify_signature(payload, secret, signature):
    computed = hmac.new(secret.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, signature)
```
