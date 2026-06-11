import { NextResponse } from "next/server";

const BASE_URL = "https://www.pumbathefish.uk";

const skillsIndex = {
  $schema:
    "https://agentskills.io/schemas/agent-skills-discovery-index-v0.2.0.json",
  skills: [
    {
      name: "fish-facts",
      type: "openapi",
      description:
        "Retrieve facts and trivia about goldfish and Pumba the Fish.",
      url: `${BASE_URL}/.well-known/agent-skills/fish-facts/SKILL.md`,
      sha256:
        "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    },
    {
      name: "memorial-api",
      type: "openapi",
      description:
        "Submit and retrieve memorial messages for Pumba the Fish.",
      url: `${BASE_URL}/.well-known/agent-skills/memorial-api/SKILL.md`,
      sha256:
        "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    },
    {
      name: "mcp-server",
      type: "mcp",
      description:
        "MCP server providing tools, resources, and prompts for Pumba data.",
      url: `${BASE_URL}/.well-known/mcp/server-card.json`,
      sha256:
        "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    },
  ],
};

export function GET() {
  return NextResponse.json(skillsIndex, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
