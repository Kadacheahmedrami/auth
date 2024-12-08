import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the 'auth_token' cookie exists in the request
  const token = req.cookies.get('auth_token'); // Get the token from cookies
  console.log(token)

  // If token is missing or invalid, redirect to the /auth page
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // If token is present, allow the request to continue
  return NextResponse.next();
}

// Apply the middleware to all routes except the auth page and static assets
export const config = {
  matcher: ['/((?!auth|_next/static|favicon.ico).*)'], // Exclude /auth and static assets
};
