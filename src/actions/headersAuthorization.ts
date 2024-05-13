"use server";
import { cookies } from "next/headers";
import { getToken } from "@/actions/auth";

export async function headersAuthorization() {
    const access_token = await getToken();

    const headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });

    if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
}