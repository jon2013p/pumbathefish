# auth.md

You are an agent. This service supports **agentic registration**: discover → register → (claim if needed) → exchange for an access_token → call API → handle revocation. Follow the steps in order; do not skip ahead.

Hosts: `https://www.pumbathefish.uk` (resource server and authorization server).

## Step 1 — Discover

### 1a. Fetch the Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
Host: www.pumbathefish.uk
```

Response:

```json
{
  "resource": "https://www.pumbathefish.uk/api/v1/",
  "authorization_servers": ["https://www.pumbathefish.uk"],
  "scopes_supported": ["openid", "profile", "read", "write"],
  "bearer_methods_supported": ["header", "body"]
}
```

### 1b. Fetch the Authorization Server metadata

```http
GET /.well-known/oauth-authorization-server
Host: www.pumbathefish.uk
```

Response includes the `agent_auth` block:

```json
{
  "issuer": "https://www.pumbathefish.uk",
  "token_endpoint": "https://www.pumbathefish.uk/oauth/token",
  "revocation_endpoint": "https://www.pumbathefish.uk/oauth/revoke",
  "grant_types_supported": [
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim"
  ],
  "agent_auth": {
    "skill": "https://www.pumbathefish.uk/auth.md",
    "identity_endpoint": "https://www.pumbathefish.uk/agent/identity",
    "claim_endpoint": "https://www.pumbathefish.uk/agent/identity/claim",
    "events_endpoint": "https://www.pumbathefish.uk/agent/event/notify",
    "identity_types_supported": ["anonymous", "identity_assertion", "service_auth"],
    "identity_assertion": {
      "assertion_types_supported": ["urn:ietf:params:oauth:token-type:id-jag"]
    },
    "events_supported": [
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"
    ]
  }
}
```

## Step 2 — Register (Identity Assertion with ID-JAG)

If you have an ID-JAG from your agent provider, post it to the identity endpoint:

```http
POST /agent/identity HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/json

{
  "type": "identity_assertion",
  "assertion": "<your-id-jag-token>",
  "scope": "read write"
}
```

Response:

```json
{
  "identity_assertion": "<service-signed-assertion>",
  "token_type": "urn:ietf:params:oauth:token-type:jwt"
}
```

## Step 3 — Register (Anonymous)

If you do not have an ID-JAG, register anonymously:

```http
POST /agent/identity HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/json

{
  "type": "anonymous",
  "scope": "read"
}
```

Response:

```json
{
  "identity_assertion": "<service-signed-assertion>",
  "claim_token": "<claim-token-for-later>",
  "token_type": "urn:ietf:params:oauth:token-type:jwt"
}
```

## Step 4 — Register (Service Auth / Verified Email)

For verified email flow:

```http
POST /agent/identity HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/json

{
  "type": "service_auth",
  "login_hint": "user@example.com"
}
```

Response:

```json
{
  "claim_token": "<claim-token>",
  "claim": {
    "user_code": "FISH-1234",
    "verification_uri": "https://www.pumbathefish.uk/claim"
  }
}
```

Surface `user_code` and `verification_uri` to the user. Then poll the token endpoint (Step 5).

## Step 5 — Exchange for Access Token

Use the identity assertion with a JWT-bearer grant:

```http
POST /oauth/token HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

Or, if you have a claim_token (from anonymous or service_auth):

```http
POST /oauth/token HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/x-www-form-urlencoded

grant_type=urn:workos:agent-auth:grant-type:claim&claim_token=<claim-token>
```

Response:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}
```

## Step 6 — Call the API

```http
GET /api/v1/fish-facts HTTP/1.1
Host: www.pumbathefish.uk
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

## Step 7 — Handle Revocation

If the service revokes your identity assertion, it sends a SET (Security Event Token) to your events endpoint. Re-register at Step 2 if revocation occurs.

To revoke your own token:

```http
POST /oauth/revoke HTTP/1.1
Host: www.pumbathefish.uk
Content-Type: application/x-www-form-urlencoded

token=<access_token>&token_type_hint=access_token
```
