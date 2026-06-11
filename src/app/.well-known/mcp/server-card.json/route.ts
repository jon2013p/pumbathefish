import { NextResponse } from "next/server";

const BASE_URL = "https://www.pumbathefish.uk";

const serverCard = {
  $schema: "https://modelcontextprotocol.io/schemas/server-card.json",
  serverInfo: {
    name: "Pumba the Fish MCP Server",
    version: "1.0.0",
    description:
      "MCP server for Pumba the Fish — provides fish facts and memorial data.",
  },
  url: `${BASE_URL}/mcp`,
  transport: {
    type: "streamable-http",
    url: `${BASE_URL}/mcp`,
  },
  capabilities: {
    tools: true,
    resources: true,
    prompts: true,
  },
  authentication: {
    type: "oauth2",
    oauth_discovery_url: `${BASE_URL}/.well-known/openid-configuration`,
  },
  contact: {
    name: "Pumba Admin",
    url: `${BASE_URL}/contact`,
  },
};

export function GET() {
  return NextResponse.json(serverCard, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
