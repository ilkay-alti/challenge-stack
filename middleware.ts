import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth-session";

export default async function middleware(req: NextRequest) {
  const session = await getSession();

  if (!session.isLoggedIn && !req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
