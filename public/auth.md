# Auth.md

## Overview

Pumba the Fish API uses OAuth 2.0 / OpenID Connect for authentication. AI agents can register and obtain credentials programmatically.

## Agent Registration

Agents can register dynamically via the registration endpoint using OAuth 2.0 Dynamic Client Registration (RFC 7591).

- **Registration URL:** `https://www.pumbathefish.uk/oauth/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Step 1: Register your agent

Send a POST request to the registration endpoint:

```http
POST /oauth/register HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/json

{
  "client_name": "Your Agent Name",
  "redirect_uris": ["https://your-agent.example.com/callback"],
  "grant_types": ["authorization_code", "client_credentials"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "client_secret_basic",
  "scope": "openid profile read write"
}
```

### Step 2: Receive client credentials

The server responds with your client credentials:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "client_id": "abc123-agent-id",
  "client_secret": "secret-xyz-456",
  "client_name": "Your Agent Name",
  "redirect_uris": ["https://your-agent.example.com/callback"],
  "grant_types": ["authorization_code", "client_credentials"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "client_secret_basic",
  "scope": "openid profile read write",
  "client_id_issued_at": 1718100000,
  "client_secret_expires_at": 0
}
```

### Step 3: Obtain an access token

Use the client credentials to request a token:

```http
POST /oauth/token HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/x-www-form-urlencoded
Authorization: Basic base64(client_id:client_secret)

grant_type=client_credentials&scope=read+write
```

### Step 4: Token response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

### Step 5: Access protected resources

```http
GET /api/v1/fish-facts HTTP/1.1
Host: www.pumbathefish.uk
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
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
