import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAuth } from "@/actions/auth";

export async function middleware(request: NextRequest) {
    // const authData = await getAuthData();
    const auth = await checkAuth();
    // // console.log('resposta auth', auth)
    if(!auth)
         // return NextResponse.redirect(new URL('/', request.url))
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // if(!authData)
    //     // return NextResponse.redirect(new URL('/', request.url))
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/minha-conta/:path*",
        "/extratos/:path*"
    ]
}