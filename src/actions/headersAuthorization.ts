"use server";
import { cookies } from "next/headers";
import { getToken } from "@/actions/auth";
import { getServerSession } from "next-auth/next"

export async function headersAuthorization() {
    const access_token = await getToken();
    const session = await getServerSession();
    console.log(session)

    const headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });

    if (session) {
        headers.set('Authorization', `Bearer ${session?.user?.image}`);
    }
    return headers;
}