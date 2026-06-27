import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
  "/pricing",
  "/blog",
  "/docs",
  "/about",
  "/contact",
  "/api/webhooks",
  "/api/auth",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Static files and Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // API routes that handle their own auth
  if (pathname.startsWith("/api/v1/") || pathname.startsWith("/api/checkout") || pathname.startsWith("/api/portal")) {
    return NextResponse.next();
  }

  // Check for session cookie as a simple auth check
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
