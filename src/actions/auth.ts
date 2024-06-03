"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from './headersAuthorization';
// import { revalidatePath } from 'next/cache';

// export async function loginAction(prevState: any, formData: FormData) {
//     "use server";
//     const cpfCnpj = formData.get('cpfCnpj') as string;
//     const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//             method: "POST",
//             cache: 'no-store',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify({
//                 cpfCnpj: cleanedCpfCnpj,
//                 password: formData.get('password'),
//                 remember_me: formData.get('remember_me')
//             })
//         });

//         if (!response.ok) {
//             const data = await response.json();
//             throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
//             return { error: data.message || 'Erro no realizar o login!' };
//         }

//         // const buffer = await response.arrayBuffer()


//         const data = await response.json();
//         await setAuthData(data);
//         redirect("/dashboard");
// }
// export async function RegisterAction(prevState: any, formData: FormData) {
//     "use server";
//     const cpfCnpj = formData.get('cpfCnpj') as string;
//     const phone = formData.get('phone') as string;
//     const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
//     const cleanedPhone = phone.replace(/\D/g, '');
//     const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
//         method: "POST",
//         cache: 'no-store',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             name: formData.get('name'),
//             cpfCnpj: cleanedCpfCnpj, 
//             phone: cleanedPhone,
//             date_birth: formData.get('date_birth'),
//             email: formData.get('email'),
//             password: formData.get('password'),
//         })
//     });
//     if (response.ok){
//         const data = await response.json();
//         data.success = "Cadastrado com sucesso!"
//         redirect("/login");
//     } else {
//         const { errors } = await response.json();
//         return {errors: errors || 'Erro no cadastro!'};
//     }
// }
export async function logoutAction() {
    // "use server";
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: headersAuth,
    });
    if (response.ok){
        await removeCookies();
        const data = await response.json();
        // data.success = "Logout com sucesso!"
        redirect('/login');        
    } else {
        console.log('erro ao sair cara')
        const data = await response.json();
        return { error: data.message || 'Erro ao logout!' };
    }
}
export async function removeCookies() {
    // 'use server'
    cookies().delete('@auth')
}

export async function getToken() {
    const data  = await getAuthData();
    const access_token = data?.payload?.access_token
    if(access_token) {
        return access_token
    }
    return false;
}
export async function getuser() {
    // "use server";
    const { payload: { user } } = await getAuthData();
    return user;
}
// export async function getTypeUser() {
//     const { payload: { user: { type_user } } } = await getAuthData();
//     return type_user;
// }
export async function getAuthData() {
    // 'use server';
    const cookiesStore = cookies();
    const hasCookie = cookiesStore.has('@auth')
    if(hasCookie) {
        const auth = cookiesStore.get("@auth")?.value ?? '{}'
        return JSON.parse(auth);
    }
    return false
}
export async function getCookiesRemove() {
    // 'use server'
    const cookiesStore = cookies();
    const auth = cookiesStore.getAll("@auth");
    if (auth) {
        cookies().delete('@auth')
    }
}

// lib iron session edge seal unseal
export async function setAuthData(jwtToken: string) {
    // "use server";
    const cookiesStore = cookies();
    cookiesStore.set('@auth', JSON.stringify({
        payload: jwtToken,
    }))
}
export async function checkAuth() {
    // "use server";
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/check_auth`, {
        headers: headersAuth
    });
    const data = await response.json();
    if(data.message === true) {
        return true
    }
    return false;
}