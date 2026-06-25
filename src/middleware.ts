import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup");
  const isDevPage = pathname.startsWith("/painel-dev");
  const isClientPage = pathname.startsWith("/painel");

  if (!sessionToken && (isClientPage || isDevPage)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }


  if (sessionToken && isAuthPage) {
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

// O matcher foca apenas nas páginas relevantes, ignorando assets e ficheiros estáticos
export const config = {
  matcher: ["/painel/:path*", "/painel-dev/:path*", "/signin", "/signup"],
};
