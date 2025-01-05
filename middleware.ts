import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Authorize only if a token exists
      return !!token;
    },
  },
  pages: {
    signIn: "/auth/sign-in", // Redirect to sign-in page if unauthorized
  },
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  // If a token exists and the user tries to access restricted routes, redirect to /browse
  if (
    token &&
    ["/", "/auth/sign-in", "/auth/sign-up"].includes(url.pathname)
  ) {
    url.pathname = "/browse";
    return NextResponse.redirect(url);
  }

  // Pass the request to NextAuth's withAuth middleware
  return authMiddleware(req as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/browse", "/", "/auth/:path*"], // Add all protected and auth-related routes
};
