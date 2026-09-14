# Authentication Guide

Our API uses JWT Bearer Tokens to authenticate requests. You must include your token in the `Authorization` header for all requests.

## Request Header Format

```http
Authorization: Bearer YOUR_SECRET_API_KEY
```

## Security Best Practices

- **Keep keys secret:** Never commit your secret keys to public repositories or front-end client code.
- **Environment variables:** Always load keys from environment variables (`.env`).
- **Rotate keys regularly:** Rotate your keys periodically in the Developer Dashboard.

## Testing Auth in the Interactive Reference

1. Go to the [API Reference](/api-reference).
2. Click the **Auth** button in the top right.
3. Paste your key into the **BearerAuth** field.
