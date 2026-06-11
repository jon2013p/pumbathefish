# Authentication

## Overview

Pumba the Fish API uses OAuth 2.0 / OpenID Connect for authentication. AI agents can register and obtain credentials programmatically.

## Agent Registration

Agents can register dynamically via the registration endpoint:

- **Registration URL:** `https://www.pumbathefish.uk/oauth/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "client_name": "Your Agent Name",
  "redirect_uris": ["https://your-agent.example.com/callback"],
  "grant_types": ["authorization_code", "client_credentials"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "client_secret_basic"
}
```

## Supported Identity Types

- `oauth2_client` — Standard OAuth 2.0 client credentials
- `openid_connect` — OIDC-based identity with ID tokens

## Supported Credential Types

- `client_secret_basic` — HTTP Basic auth with client_id and client_secret
- `client_secret_post` — Credentials in POST body
- `private_key_jwt` — JWT signed with client's private key

## Endpoints

| Endpoint | URL |
|----------|-----|
| Authorization | `https://www.pumbathefish.uk/oauth/authorize` |
| Token | `https://www.pumbathefish.uk/oauth/token` |
| Registration | `https://www.pumbathefish.uk/oauth/register` |
| JWKS | `https://www.pumbathefish.uk/.well-known/jwks.json` |
| Revocation | `https://www.pumbathefish.uk/oauth/revoke` |
| UserInfo | `https://www.pumbathefish.uk/oauth/userinfo` |

## Scopes

- `openid` — OpenID Connect identity
- `profile` — User profile information
- `email` — Email address
- `read` — Read access to resources
- `write` — Write access to resources

## Discovery

- OpenID Configuration: `/.well-known/openid-configuration`
- OAuth Protected Resource: `/.well-known/oauth-protected-resource`
- OAuth Authorization Server: `/.well-known/oauth-authorization-server`
