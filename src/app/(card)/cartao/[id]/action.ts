import { headersAuthorization } from "@/actions/headersAuthorization";
import cleanedFormatPrice from '@/help/cleanedFormatPrice';
import { redirect } from "next/navigation";
import { ZodError, z } from 'zod';

const validarCelular = (telefone: string): boolean => {
    const cleanedTelefone = telefone.replace(/\s+/g, '').replace(/[\(\)-]/g, '');
    const regex = /^\(?[1-9]{2}\)? ?9[6-9][0-9]{3}-?[0-9]{4}$/;
    return regex.test(cleanedTelefone);
};

const schema = z.object({
    phone: z.string().refine((value) => validarCelular(value), {
        message: "Número é inválido.",
    }),
    price: z.string().refine((value) => {
        // Remove o símbolo de R$ e converte a string para float
        const numericValue = parseFloat(value.replace("R$", "").replace(",", ".").trim());
        return numericValue >= 50.00;
    }, {
        message: "O valor deve ser maior ou igual a R$ 50,00."
    }),
    name: z.string().min(1, "Nome é obrigatório."),
    messageText: z.string().min(1, "A Mensagem é obrigatório."),
});
type Fields = {
    name: string;
    phone: string;
    price: string;
    messageText: string;
};
interface FormState {
    message: string;
    errors: Partial<Record<keyof Fields, string>> | undefined;
    fieldValues: Fields;
}

export async function postSchedule(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const headersAuth = await headersAuthorization();
    const price = formData.get('price') as string;
    const phone = formData.get("phone") as string;
    const name = formData.get("name") as string;
    const messageText = formData.get("messageText") as string;
    const cleanedPrice = cleanedFormatPrice(price)
    const cleanedWhatsapp = phone.replace(/\D/g, '');

    try {
        schema.parse({
            name,
            phone,
            price,
            messageText
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/schedules`, {
            method: "POST",
            cache: 'no-store',
            headers: headersAuth,
            body: JSON.stringify({
                name: formData.get('name'),
                whatsapp: cleanedWhatsapp,
                birthDate: formData.get('birthDate'),
                price: cleanedPrice,
                message: formData.get('messageText'),
                card_id: formData.get('card_id'),
                user_id: formData.get('user_id')
            })
        });
        if (!res.ok) {
            // const { errors } = await res.json();
            // console.log('[ERRORS]', errors)
            const data = await res.json();
            console.log('resposta API', data)
            if (data?.message === "Unauthenticated.") {
                return { message: 'unauthenticated', errors: data || { message: 'Você precisa realizar login para essa ação.' }, fieldValues: prevState.fieldValues };
            }
            // return {errors: errors || 'Erro no cadastro!'};
            return { message: 'error', errors: data || { message: 'Erro no cadastro!' }, fieldValues: prevState.fieldValues };
        }
        // const data = await res.json();
        // if (data?.message === "Unauthenticated.") {
        //     console.log('Unauthenticated', data)
        // }


        return {
            message: "success",
            errors: undefined,
            fieldValues: {
                name: "",
                phone: "",
                price: "",
                messageText: ""
            }
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMap = error.flatten().fieldErrors;
            return {
                message: "error",
                // error: "",
                errors: {
                    name: errorMap["name"]?.[0] ?? "",
                    phone: errorMap["phone"]?.[0] ?? "",
                    price: errorMap["price"]?.[0] ?? "",
                    messageText: errorMap["messageText"]?.[0] ?? "",
                },
                fieldValues: {
                    name,
                    phone,
                    price,
                    messageText
                },
            };
        } else {
            console.error('Unexpected error:', error);
            // throw new Error(`Algo deu errado!`)
            return {
                message: "error",
                // error: "Unexpected error occurred.",
                errors: undefined,
                fieldValues: prevState.fieldValues,
            };
        }
    }
    
    // if (response.ok){
    //     const { data }  = await response.json();
    //     // console.log('salvou', purchase_id)
    //     // return data
    //     // redirectect(`/pagamento/${data.purchase_id}`);
    // } else {
    //     const data = await response.json();
    //     console.log('erro data', data)
    //     // throw new Error('Erro no realizar o login!');
    //     // return { error: data.message || 'Erro a salvar sua informação!' };
    // }
    return prevState;
}