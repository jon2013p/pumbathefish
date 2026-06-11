import { NextResponse } from "next/server";

const BASE_URL = "https://www.pumbathefish.uk";

const authServerMetadata = {
  issuer: BASE_URL,
  authorization_endpoint: `${BASE_URL}/oauth/authorize`,
  token_endpoint: `${BASE_URL}/oauth/token`,
  registration_endpoint: `${BASE_URL}/oauth/register`,
  revocation_endpoint: `${BASE_URL}/oauth/revoke`,
  jwks_uri: `${BASE_URL}/.well-known/jwks.json`,
  scopes_supported: ["openid", "profile", "email", "read", "write"],
  response_types_supported: ["code", "token", "id_token", "code id_token"],
  grant_types_supported: [
    "authorization_code",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim",
  ],
  token_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
    "private_key_jwt",
  ],
  code_challenge_methods_supported: ["S256"],
  agent_auth: {
    skill: `${BASE_URL}/auth.md`,
    identity_endpoint: `${BASE_URL}/agent/identity`,
    claim_endpoint: `${BASE_URL}/agent/identity/claim`,
    events_endpoint: `${BASE_URL}/agent/event/notify`,
    identity_types_supported: [
      "anonymous",
      "identity_assertion",
      "service_auth",
    ],
    identity_assertion: {
      assertion_types_supported: [
        "urn:ietf:params:oauth:token-type:id-jag",
      ],
    },
    events_supported: [
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked",
    ],
  },
};

export function GET() {
  return NextResponse.json(authServerMetadata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
