import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  //   console.log(pathname);

  //allow the requests if
  //    1) its a request for next-auth session token and provider fetching
  //   2)the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //    redirect to login if tryna access protected pages
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
