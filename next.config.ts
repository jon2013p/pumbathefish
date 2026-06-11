import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              "</.well-known/api-catalog>; rel=\"api-catalog\"",
              "</sitemap.xml>; rel=\"sitemap\"",
              "</.well-known/agent.json>; rel=\"agent-description\"",
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
