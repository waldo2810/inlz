import { NextRequest, NextResponse } from "next/server";

async function decodedToken(token: string) {
  const res = await fetch("http://localhost:8080/auth/decode", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const decoded: DecodedTokenResponse = await res.json();
  return decoded;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get(process.env.TOKEN_NAME as string);
  const token = cookie?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const user = await decodedToken(token as string);

    if (user.exp < Date.now() / 1000) {
      console.log("token and expired");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/login") {
      console.log("token and valid, go home");
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/home", "/projects", "/login"],
};
