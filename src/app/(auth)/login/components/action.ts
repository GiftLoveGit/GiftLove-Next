"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

type Fields = {
    cpfCnpj: string;
    password: string;
};
interface FormState {
    message: string;
    error: string
    errors: Partial<Record<keyof Fields, string>> | undefined;
    fieldValues: Fields;
}
const schema = z.object({
    cpfCnpj: z.string().min(3, "CPF/CNPJ obrigatório."),
    password: z.string().min(3, "Senha obrigatório."),
});
export async function loginAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    "use server";
    const cpfCnpj = formData.get('cpfCnpj') as string;
    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const password = formData.get('password') as string;
    const remember_me = formData.get('remember_me') === null ? false : true;
    let redirectPath: string | null = null
    try {
        schema.parse({
            cpfCnpj,
            password
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                cpfCnpj: cleanedCpfCnpj,
                password,
                remember_me
            })
        })
        if (!res.ok) {
            const data = await res.json();
            return { 
                message: 'error', 
                error: data.message || 'Erro ao realizar login!', 
                errors: undefined, 
                fieldValues: prevState.fieldValues 
            };
        }
        const data = await res.json();
        const setAuth = await setAuthData(data);
        if (setAuth) {
            redirectPath = `/dashboard`
        }

        return prevState;
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMap = error.flatten().fieldErrors;
            return {
                message: "error",
                error: "",
                errors: {
                    cpfCnpj: errorMap["cpfCnpj"]?.[0] ?? "",
                    password: errorMap["password"]?.[0] ?? "",
                },
                fieldValues: {
                    cpfCnpj,
                    password,
                },
            };
        } else {
            console.error('Unexpected error:', error);
            throw new Error(`Algo deu errado!`)
            return {
                message: "error",
                error: "Unexpected error occurred.",
                errors: undefined,
                fieldValues: prevState.fieldValues,
            };
        }
        // const zodError = error as ZodError;
        // const errorMap = zodError.flatten().fieldErrors;
        // return {
        //     message: "error",
        //     error: "",
        //     errors: {
        //         cpfCnpj: errorMap["cpfCnpj"]?.[0] ?? "",
        //         password: errorMap["password"]?.[0] ?? "",
        //     },
        //     fieldValues: {
        //         cpfCnpj,
        //         password,
        //     }
        // }
    } finally  {
        if (redirectPath)
            redirect(redirectPath)
    }
}
export async function setAuthData(jwtToken: string) {
    "use server";
    const cookiesStore = cookies();
    cookiesStore.set('@auth', JSON.stringify({
        payload: jwtToken,
    }));
    return true;
}