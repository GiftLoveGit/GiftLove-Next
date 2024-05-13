import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthData } from "@/actions/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authData = await getAuthData();
    if(!authData)
        // return NextResponse.redirect(new URL('/', request.url))
        return NextResponse.redirect(new URL('/login', request.url));
    }

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/minha-conta/:path*",
        "/extratos/:path*"
    ]
}