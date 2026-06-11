"use client";

import { useEffect } from "react";

export function WebMCP() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: {
        provideContext: (config: unknown) => void;
      };
    };

    if (nav.modelContext?.provideContext) {
      nav.modelContext.provideContext({
        tools: [
          {
            name: "get_fish_facts",
            description:
              "Returns interesting facts about Pumba the goldfish and goldfish in general.",
            inputSchema: {
              type: "object",
              properties: {
                topic: {
                  type: "string",
                  description:
                    "Optional topic to filter facts (e.g. 'diet', 'lifespan', 'memory')",
                },
              },
              required: [],
            },
            execute: async ({ topic }: { topic?: string }) => {
              const facts: Record<string, string[]> = {
                diet: [
                  "Pumba loved premium flake food and the occasional bloodworm treat.",
                ],
                lifespan: [
                  "Goldfish can live 10-15 years with proper care. Pumba lived a full, glorious life.",
                ],
                memory: [
                  "Contrary to myth, goldfish have memories lasting months. Pumba remembered feeding time perfectly.",
                ],
                general: [
                  "Pumba was a common goldfish (Carassius auratus) with an uncommonly big personality.",
                  "Goldfish can recognize their owners and will swim excitedly at feeding time.",
                  "Pumba's favorite spot was near the tank filter where the current was strongest.",
                ],
              };
              const key = topic?.toLowerCase() || "general";
              return facts[key] || facts.general;
            },
          },
          {
            name: "leave_memorial_message",
            description:
              "Leave a memorial message in honor of Pumba the Fish.",
            inputSchema: {
              type: "object",
              properties: {
                author: {
                  type: "string",
                  description: "Name of the person leaving the message",
                },
                message: {
                  type: "string",
                  description: "The memorial message",
                },
              },
              required: ["message"],
            },
            execute: async ({
              author,
              message,
            }: {
              author?: string;
              message: string;
            }) => {
              return {
                success: true,
                response: `Memorial from ${author || "Anonymous"} recorded: "${message}"`,
              };
            },
          },
          {
            name: "get_site_info",
            description:
              "Returns metadata about this site and its purpose.",
            inputSchema: {
              type: "object",
              properties: {},
              required: [],
            },
            execute: async () => {
              return {
                name: "Pumba the Fish Memorial",
                purpose:
                  "An honorary home page dedicated to the memory of Pumba the goldfish.",
                endpoints: {
                  api_catalog: "/.well-known/api-catalog",
                  openid_configuration: "/.well-known/openid-configuration",
                  mcp_server: "/.well-known/mcp/server-card.json",
                  agent_skills: "/.well-known/agent-skills/index.json",
                },
              };
            },
          },
        ],
      });
    }
  }, []);

  return null;
}
