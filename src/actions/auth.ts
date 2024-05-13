"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from './headersAuthorization';

export async function loginAction(prevState: any, formData: FormData) {
    const cpfCnpj = formData.get('cpfCnpj') as string;
    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                cpfCnpj: cleanedCpfCnpj,
                password: formData.get('password'),
            })
        });
        
        if (response.ok){
            const data = await response.json();
            await setAuthData(data);
            redirect("/dashboard");
        } else {
            const data = await response.json();
            console.log('error', data)
            return { error: data.message || 'Erro no realizar o login!' };
            // console.error('error response', response.json());
        }
    } catch (error) {
        console.error('Error in loginAction:', error);
        return 'error'
    }
}
export async function RegisterAction(prevState: any, formData: FormData) {
    const cpfCnpj = formData.get('cpfCnpj') as string;
    const phone = formData.get('phone') as string;
    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const cleanedPhone = phone.replace(/\D/g, '');
    const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: formData.get('name'),
            cpfCnpj: cleanedCpfCnpj, 
            phone: cleanedPhone,
            date_birth: formData.get('date_birth'),
            email: formData.get('email'),
            password: formData.get('password'),
        })
    });
    if (response.ok){
        const data = await response.json();
        console.log('success',data)
        data.success = "Cadastrado com sucesso!"
        redirect("/login");
    } else {
        const { errors } = await response.json();
        console.log(errors)
        // let errorMessage = 'Erro no cadastro!';
        return {errors: errors || 'Erro no cadastro!'};
    }
}
export async function logoutAction() {
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: headersAuth,
    });
    if (response.ok){
        const data = await response.json();
        console.log(data)
        data.success = "Logout com sucesso!"
        const cookiesStore = cookies();
        cookiesStore.delete('@auth');
        redirect('/login');        
    } else {
        console.log('erro ao sair cara')
        const data = await response.json();
        return { error: data.message || 'Erro ao logout!' };
    }
}

export async function getToken() {
    const { payload: { access_token } } = await getAuthData();
    return access_token;
}
export async function getuser() {
    const { payload: { user } } = await getAuthData();
    return user;
}
// export async function getTypeUser() {
//     const { payload: { user: { type_user } } } = await getAuthData();
//     return type_user;
// }
export async function getAuthData() {
    const cookiesStore = cookies();
    const auth = cookiesStore.get("@auth")?.value;
    // console.log(auth);
    if (!auth) {
        return null;
    }

    return JSON.parse(auth);
}

// lib iron session edge seal unseal
export async function setAuthData(jwtToken: string) {
    const cookiesStore = cookies();
    // console.log(cookiesStore.get("@auth"))
    cookiesStore.set('@auth', JSON.stringify({
        payload: jwtToken,
        // payload: jwtToken?.user
    }))
}