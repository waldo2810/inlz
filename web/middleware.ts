import { NextRequest, NextResponse } from "next/server";

async function decodedToken(token: string) {
  const res = await fetch("http://localhost:8080/auth/decode", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return (await res.json()) as DecodedTokenResponse;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  );
  const token = cookie?.value;

  if (!token) {
    console.log("no token at all");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await decodedToken(token as string);
  if (token && user.exp < Date.now() / 1000) {
    console.log("token exists but expired");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (token && pathname === "/login") {
  //   console.log("token exists and valid. go home");
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }
}

export const config = {
  // matcher: ["/", "/home", "/projects", "/login"],
  matcher: ["/", "/home", "/projects"],
};
