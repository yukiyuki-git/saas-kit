import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") || "SaaS Kit";
  const description = url.searchParams.get("description") || "Production-Ready SaaS Template";

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <text x="100" y="250" fill="white" font-family="system-ui, sans-serif" font-size="64" font-weight="bold">
    ${escapeXml(title)}
  </text>
  <text x="100" y="330" fill="#a0a0a0" font-family="system-ui, sans-serif" font-size="28">
    ${escapeXml(description)}
  </text>
  <rect x="100" y="400" width="200" height="50" rx="8" fill="white" />
  <text x="200" y="432" fill="black" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">
    Get Started
  </text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
