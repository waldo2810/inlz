import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/", "/home"];

async function decodedToken(token: string) {
  const res = await fetch("http://localhost:8080/auth/decode", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const decoded: DecodedTokenResponse = await res.json();
  return decoded;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const cookie = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN as string);
  const token = cookie?.value;

  if (!token || (!token && protectedRoutes.includes(url.pathname))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const user = await decodedToken(token as string);
  if (user.exp < Date.now() / 1000) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
