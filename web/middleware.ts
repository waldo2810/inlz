import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  )?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = await fetch(`http://localhost:8080/auth/decode`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = await response.json();
  console.log({
    exp: new Date(decodedToken.exp * 1000).toLocaleString(),
    now: new Date(Date.now()).toLocaleString(),
  });

  if (decodedToken.exp * 1000 < Date.now()) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // If the token is valid and not expired, and the request is for the login page, redirect to home
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/projects/:path*", "/tasks/:path*", "/login"],
};
