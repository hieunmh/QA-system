import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const cookieStore = cookies();
  const token = cookieStore.get('XSRF-TOKEN');
  const { pathname } = new URL(req.url);

  if (token?.name && (pathname == '/signup' || pathname == '/signin' || pathname == '/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!token?.name && pathname == '/dashboard') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};