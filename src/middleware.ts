// export { auth as middleware } from "@/auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // Import the default middleware
import APP_PATHS from "./config/path.config";
import { ROLE } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public Routes
  if (
    pathname.startsWith(APP_PATHS.GUEST_ZAKAAT_APPLICATIONS) ||
    pathname.startsWith(APP_PATHS.GUEST_TWEETS) ||
    pathname.startsWith(APP_PATHS.HOME)
  )
    return NextResponse.next();

  const session = await auth(); // Run default NextAuth.js middleware

  // If no session or user, redirect to sign-in
  if (!session || !session.user) {
    return NextResponse.redirect(new URL(APP_PATHS.SIGNIN, req.url));
  }

  // If phoneNum is missing, redirect to the welcome page
  if (!session.user.phoneNum) {
    return NextResponse.redirect(new URL(APP_PATHS.WELCOME, req.url));
  }

  // Role-based authorization for "donor" paths
  if (
    (pathname.startsWith("/donor") && session.user.role !== ROLE.DONOR) ||
    (pathname.startsWith("/verifier") && session.user.role !== ROLE.VERIFIER)
  ) {
    return NextResponse.redirect(new URL(APP_PATHS.SIGNIN, req.url));
  }

  // redirect after signIn
  if (pathname.startsWith(APP_PATHS.SIGNIN) && session.user.role === ROLE.DONOR)
    return NextResponse.redirect(
      new URL(APP_PATHS.ZAKAAT_APPLICATIONS, req.url)
    );

  if (
    pathname.startsWith(APP_PATHS.SIGNIN) &&
    session.user.role === ROLE.VERIFIER
  )
    return NextResponse.redirect(new URL(APP_PATHS.SEARCH_APPLICANT, req.url));

  // Allow request to proceed
  return NextResponse.next();
}

// Apply middleware to all paths except
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
