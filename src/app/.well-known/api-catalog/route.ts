import { NextResponse } from "next/server";

const catalog = {
  linkset: [
    {
      anchor: "https://www.pumbathefish.uk/api/v1/",
      "service-desc": [
        {
          href: "https://www.pumbathefish.uk/api/v1/openapi.json",
          type: "application/openapi+json",
        },
      ],
      "service-doc": [
        {
          href: "https://www.pumbathefish.uk/docs/api",
          type: "text/html",
        },
      ],
      status: [
        {
          href: "https://www.pumbathefish.uk/api/v1/health",
          type: "application/json",
        },
      ],
    },
  ],
};

export function GET() {
  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
