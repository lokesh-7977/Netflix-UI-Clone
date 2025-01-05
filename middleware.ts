import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out"
  },
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (token && ["/", "/auth/sign-in", "/auth/sign-up"].includes(url.pathname)) {
    url.pathname = "/browse";
    return NextResponse.redirect(url);
  }

  return authMiddleware(req as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/browse","/auth/:path*"], 
};
