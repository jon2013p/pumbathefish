import { NextResponse } from "next/server";

const BASE_URL = "https://www.pumbathefish.uk";

const protectedResourceMetadata = {
  resource: `${BASE_URL}/api/v1/`,
  authorization_servers: [BASE_URL],
  scopes_supported: ["openid", "profile", "read", "write"],
  bearer_methods_supported: ["header", "body"],
  resource_signing_alg_values_supported: ["RS256"],
  resource_documentation: `${BASE_URL}/docs/api`,
};

export function GET() {
  return NextResponse.json(protectedResourceMetadata, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
