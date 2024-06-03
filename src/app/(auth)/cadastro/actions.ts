"use server";
import { redirect, useRouter  } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from '@/actions/headersAuthorization';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
};

// Função para validar CNPJ
const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false; // Verifica se todos os dígitos são iguais

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
};

const validarCelular = (telefone: string): boolean => {
    const regex = /^\(?[1-9]{2}\)? ?9?[6-9][0-9]{3}-?[0-9]{4}$/;
    return regex.test(telefone);
};


// Criação do esquema Zod com validação de CPF ou CNPJ
const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório."),
    cpfCnpj: z.string().refine((value) => validarCPF(value) || validarCNPJ(value), {
        message: "CPF ou CNPJ inválido.",
    }),
    phone: z.string().refine((value) => validarCelular(value), {
        message: "Número de telefone inválido.",
    }),
    date_birth: z.string().refine((value) => {
        // Verifica se é uma data válida
        const date = new Date(value);
        return !isNaN(date.getTime());
    }, {
        message: "Data de nascimento inválida.",
    }),
    email: z.string().email("Email inválido."),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
    terms: z.boolean().refine((value) => value === true, {
        message: "Você deve aceitar os termos.",
    })
});

type Fields = {
    name: string;
    cpfCnpj: string;
    phone: string;
    date_birth: string;
    email: string;
    password: string;
    terms: boolean;
};

interface FormState {
    message: string;
    errors: Partial<Record<keyof Fields, string>> | undefined;
    fieldValues: Fields;
}
export async function RegisterAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    "use server";
    const name = formData.get("name") as string;
    const cpfCnpj = formData.get("cpfCnpj") as string;
    const phone = formData.get("phone") as string;
    const date_birth = formData.get("date_birth") as string;
    const email = formData.get("email") as string;
    const terms = formData.get("terms") === null ? false : true;
    const password = formData.get("password") as string;
    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const cleanedPhone = phone.replace(/\D/g, '');
    try {
        schema.parse({
            name,
            cpfCnpj,
            phone,
            date_birth,
            email,
            password,
            terms
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
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
        })
        if (!res.ok) {
            const { errors } = await res.json();
            // return {errors: errors || 'Erro no cadastro!'};
            return { message: 'error', errors: errors || { message: 'Erro no cadastro!' }, fieldValues: prevState.fieldValues };
        }
        // redirect("/login");
        return {
            message: "success",
            errors: undefined,
            fieldValues: {
                name: "",
                cpfCnpj: "",
                phone: "",
                date_birth: "",
                email: "",
                password: "",
                terms: false,
            }
        }
    } catch (error) {
        const zodError = error as ZodError;
        const errorMap = zodError.flatten().fieldErrors;
        return {
            message: "error",
            errors: {
                name: errorMap["name"]?.[0] ?? "",
                cpfCnpj: errorMap["cpfCnpj"]?.[0] ?? "",
                phone: errorMap["phone"]?.[0] ?? "",
                date_birth: errorMap["date_birth"]?.[0] ?? "",
                email: errorMap["email"]?.[0] ?? "",
                password: errorMap["password"]?.[0] ?? "",
                terms: errorMap["terms"]?.[0] ?? ""
            },
            fieldValues: {
                name,
                cpfCnpj,
                phone,
                date_birth,
                email,
                password,
                terms
            }
        }
    }
}