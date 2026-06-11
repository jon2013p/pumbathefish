import { NextRequest, NextResponse } from "next/server";

const MARKDOWN_CONTENT = `# Pumba the Fish

An honorary home page for Pumba the fish.

---

## In Honor of Pumba the Fish

A legendary fish. Gone but never forgotten.

---

- [Sitemap](/sitemap.xml)
- [API Catalog](/.well-known/api-catalog)
- [Agent Description](/.well-known/agent.json)
`;

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (request.nextUrl.pathname === "/" && accept.includes("text/markdown")) {
    const tokenCount = MARKDOWN_CONTENT.split(/\s+/).length;

    return new NextResponse(MARKDOWN_CONTENT, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(tokenCount),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
