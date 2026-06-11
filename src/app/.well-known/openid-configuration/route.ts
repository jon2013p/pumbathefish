import { NextResponse } from "next/server";

const BASE_URL = "https://www.pumbathefish.uk";

const openidConfig = {
  issuer: BASE_URL,
  authorization_endpoint: `${BASE_URL}/oauth/authorize`,
  token_endpoint: `${BASE_URL}/oauth/token`,
  userinfo_endpoint: `${BASE_URL}/oauth/userinfo`,
  jwks_uri: `${BASE_URL}/.well-known/jwks.json`,
  registration_endpoint: `${BASE_URL}/oauth/register`,
  scopes_supported: ["openid", "profile", "email", "read", "write"],
  response_types_supported: ["code", "token", "id_token", "code id_token"],
  grant_types_supported: [
    "authorization_code",
    "client_credentials",
    "refresh_token",
  ],
  subject_types_supported: ["public"],
  id_token_signing_alg_values_supported: ["RS256"],
  token_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
  ],
};

export function GET() {
  return NextResponse.json(openidConfig, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
