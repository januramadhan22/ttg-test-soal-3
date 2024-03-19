import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const isAdminPage = ["admin"];
const isAuthPage = ["auth"];

export default function WithAuth(
  middleware: NextMiddleware,
  requiredAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];
    console.log(req.url);

    if (requiredAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET,
      });

      // If no token exists and the user is trying to access an auth page, proceed with middleware
      if (!token && !isAuthPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        // If a token exists, redirect the user away from the auth page
        if (isAuthPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        // If the user is not an admin and is trying to access an admin page, redirect them
        if (token.role !== "admin" && isAdminPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
