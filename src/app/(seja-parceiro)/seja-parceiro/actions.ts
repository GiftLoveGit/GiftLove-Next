// "use server";
// import { ZodError, z } from 'zod';

// // Função para validar CPF
// const validarCPF = (cpf: string): boolean => {
//     cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
//     if (cpf.length !== 11) return false;
//     if (/^(\d)\1+$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais
    
//     let soma = 0;
//     let resto;
    
//     for (let i = 1; i <= 9; i++) {
//         soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
//     }
//     resto = (soma * 10) % 11;
    
//     if (resto === 10 || resto === 11) resto = 0;
//     if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
//     soma = 0;
//     for (let i = 1; i <= 10; i++) {
//         soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
//     }
//     resto = (soma * 10) % 11;
    
//     if (resto === 10 || resto === 11) resto = 0;
//     if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
//     return true;
// };

// // Função para validar CNPJ
// const validarCNPJ = (cnpj: string): boolean => {
//     cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
//     if (cnpj.length !== 14) return false;
//     if (/^(\d)\1+$/.test(cnpj)) return false; // Verifica se todos os dígitos são iguais

//     let tamanho = cnpj.length - 2;
//     let numeros = cnpj.substring(0, tamanho);
//     let digitos = cnpj.substring(tamanho);
//     let soma = 0;
//     let pos = tamanho - 7;
    
//     for (let i = tamanho; i >= 1; i--) {
//         soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
//         if (pos < 2) pos = 9;
//     }
    
//     let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//     if (resultado !== parseInt(digitos.charAt(0))) return false;

//     tamanho = tamanho + 1;
//     numeros = cnpj.substring(0, tamanho);
//     soma = 0;
//     pos = tamanho - 7;
    
//     for (let i = tamanho; i >= 1; i--) {
//         soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
//         if (pos < 2) pos = 9;
//     }
    
//     resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//     if (resultado !== parseInt(digitos.charAt(1))) return false;

//     return true;
// };

// const validarCelular = (telefone: string): boolean => {
//     const regex = /^\(?[1-9]{2}\)? ?9?[6-9][0-9]{3}-?[0-9]{4}$/;
//     return regex.test(telefone);
// };
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];


// // Criação do esquema Zod com validação de CPF ou CNPJ
// const schema = z.object({
//     name: z.string().min(1, "Nome obrigatório."),
//     name_store: z.string().min(1, "Nome da loja é obrigatório."),
//     cpfCnpj: z.string().refine((value) => validarCPF(value) || validarCNPJ(value), {
//         message: "CPF ou CNPJ inválido.",
//     }),
//     phone: z.string().refine((value) => validarCelular(value), {
//         message: "Número de telefone inválido.",
//     }),
//     date_birth: z.string().refine((value) => {
//         // Verifica se é uma data válida
//         const date = new Date(value);
//         return !isNaN(date.getTime());
//     }, {
//         message: "Data de nascimento inválida.",
//     }),
//     email: z.string().email("Email inválido."),
//     address: z.string().min(3, "Logradouro obrigatório."),
//     cep: z.string().min(3, "CEP obrigatório."),
//     number: z.string().min(1, "Número obrigatório."),
//     logo: z.string().refine(
//         (base64) => {
//             const size = (base64.length * (3/4)) - (base64.includes('==') ? 2 : base64.includes('=') ? 1 : 0);
//             return size <= MAX_FILE_SIZE;
//         },
//         `O tamanho máximo da imagem é 5 MB.`
//     ).refine(
//         (base64) => {
//             const prefix = base64.split(',')[0];
//             return ACCEPTED_IMAGE_TYPES.some(type => prefix.includes(type));
//         },
//         "Apenas os formatos .jpg, .jpeg, .png, .gif e .webp são suportados."
//     ),
//     site: z.string(),
//     facebook: z.string(),
//     instagram: z.string(),
//     tiktok: z.string(),
//     category: z.string(),
// });

// type Fields = {
//     name: string;
//     address: string;
//     cpfCnpj: string;
//     phone: string;
//     date_birth: string;
//     email: string;
//     name_store: string;
//     cep: string;
//     number: string;
//     site: string;
//     facebook: string;
//     instagram: string;
//     tiktok: string;
//     category: string;
//     logo: File | null;
// };

// interface FormState {
//     message: string;
//     errors: Partial<Record<keyof Fields, string>> | undefined;
//     fieldValues: Fields;
// }
// export async function RegisterAction(
//     prevState: FormState,
//     formData: FormData
// ): Promise<FormState> {
//     "use server";
//     console.log(FormData)
//     const name = formData.get("name") as string;
//     const cpfCnpj = formData.get("cpfCnpj") as string;
//     const phone = formData.get("phone") as string;
//     const date_birth = formData.get("date_birth") as string;
//     const email = formData.get("email") as string;
//     const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
//     const cleanedPhone = phone.replace(/\D/g, '');
//     const address = formData.get("address") as string;
//     const name_store = formData.get("name_store") as string;
//     const cep = cpfCnpj.replace(/\D/g, '');
//     const cleanedcep = formData.get("cep") as string;
//     const number = formData.get("number") as string;
//     const site = formData.get("site") as string;
//     const facebook = formData.get("facebook") as string;
//     const instagram = formData.get("instagram") as string;
//     const tiktok = formData.get("tiktok") as string;
//     const category = formData.get("category") as string;
//     const logo = 'formData.get("logo") as File | null;'
//     // const logo = formData.get("logo")
//     try {
//         // schema.parse({
//         //     name,
//         //     address,
//         //     cpfCnpj,
//         //     phone,
//         //     date_birth,
//         //     email,
//         //     name_store,
//         //     cep,
//         //     number,
//         //     site,
//         //     facebook,
//         //     instagram,
//         //     tiktok,
//         //     category,
//         //     logo
//         // });
//         // const bodyFormData = new FormData();
//         // bodyFormData.append("name", name);
//         // bodyFormData.append("cpfCnpj", cleanedCpfCnpj);
//         // bodyFormData.append("phone", cleanedPhone);
//         // bodyFormData.append("date_birth", date_birth);
//         // bodyFormData.append("email", email);
//         // bodyFormData.append("address", address);
//         // bodyFormData.append("name_store", name_store);
//         // bodyFormData.append("cep", cep);
//         // bodyFormData.append("number", number);
//         // bodyFormData.append("site", site);
//         // bodyFormData.append("facebook", facebook);
//         // bodyFormData.append("instagram", instagram);
//         // bodyFormData.append("tiktok", tiktok);
//         // bodyFormData.append("category", category);
//         // if (logo) {
//         //     bodyFormData.append("logo", logo);
//         // }
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register_store`, {
//             method: "POST",
//             cache: 'no-store',
//             // headers: {
//             //     'Content-Type': 'application/json',
//             //     'Accept': 'application/json',
//             // },
//             headers:{
//                 accept: 'application/json',
//                 'User-agent': 'learning app',
//             },
//             body: formData
//         })
//         const data2 = await res.json();
//         console.log('[DATA DA RESPOSTA]', data2)
//         if (!res.ok) {
//             // const data = await res.json();
//             const { errors } = await res.json();
//             return { message: 'error', errors: errors || { message: 'Erro no cadastro!' }, fieldValues: prevState.fieldValues };
//         }
//         const data = await res.json();
//         return {
//             message: "success",
//             errors: undefined,
//             fieldValues: {
//                 name: "",
//                 address: "",
//                 cpfCnpj: "",
//                 phone: "",
//                 date_birth: "",
//                 email: "",
//                 name_store: "",
//                 cep: "",
//                 number: "",
//                 site: "",
//                 facebook: "",
//                 instagram: "",
//                 tiktok: "",
//                 category: "",
//                 logo: null
//             }
//         }
//     } catch (error) {
//         // console.log('error', error)
//         if (error instanceof ZodError) {
//         const zodError = error as ZodError;
//         const errorMap = zodError.flatten().fieldErrors;
//         return {
//             message: "error",
//             errors: {
//                 name_store: errorMap["name_store"]?.[0] ?? "",
//                 name: errorMap["name"]?.[0] ?? "",
//                 cpfCnpj: errorMap["cpfCnpj"]?.[0] ?? "",
//                 phone: errorMap["phone"]?.[0] ?? "",
//                 date_birth: errorMap["date_birth"]?.[0] ?? "",
//                 email: errorMap["email"]?.[0] ?? "",
//                 address: errorMap["address"]?.[0] ?? "",
//                 cep: errorMap["cep"]?.[0] ?? "",
//                 number: errorMap["number"]?.[0] ?? "",
//                 category: errorMap["category"]?.[0] ?? "",
//                 logo: errorMap["logo"]?.[0] ?? "",
//             },
//             fieldValues: {
//                 name,
//                 address,
//                 cpfCnpj,
//                 phone,
//                 date_birth,
//                 email,
//                 name_store,
//                 cep,
//                 number,
//                 site,
//                 facebook,
//                 instagram,
//                 tiktok,
//                 category,
//                 logo
//             }
//         }
//     } else {
//         console.error('Unexpected error:', error);
//         // throw new Error(`Algo deu errado!`)
//         return {
//             message: "error",
//             // error: "Unexpected error occurred.",
//             errors: undefined,
//             fieldValues: prevState.fieldValues,
//         };
//     }
//     }

//     return prevState;
// }


