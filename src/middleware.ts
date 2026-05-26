import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  if (!sessionToken && pathname.startsWith("/painel")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if(sessionToken && (pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/painel", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/painel/:path*", "/signin", "/signup", "/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
