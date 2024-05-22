"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from './headersAuthorization';
import { revalidatePath } from 'next/cache'
import { getAuthData } from '@/actions/auth';
import cleanedFormatPrice from '@/help/cleanedFormatPrice';

export async function getDataCard(id: string) {
    'use server';
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/gift_card/${id}`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if (response.ok){
        const {data : {id, price, message, file_base64}} = await response.json();
        let dados = { id, price, message, file_base64 };
        revalidatePath('/(card)/cartao/[id]', 'page')
        return dados
    } else {
        throw new Error('Erro ao obter dados do cartão de presente!');
    }
}
export async function postSchedule(prevState: any, formData: FormData) {
    'use server';
    const headersAuth = await headersAuthorization();
    const auth = await getAuthData();
    const price = formData.get('price') as string;
    const cleanedPrice = cleanedFormatPrice(price)
    const whatsapp = formData.get('whatsapp') as string;
    const cleanedWhatsapp = whatsapp.replace(/\D/g, '');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/schedules`, {
        method: "POST",
        cache: 'no-store',
        headers: headersAuth,
        body: JSON.stringify({
            name: formData.get('name'),
            whatsapp: cleanedWhatsapp,
            birthDate: formData.get('birthDate'),
            price: cleanedPrice,
            message: formData.get('message'),
            card_id: formData.get('card_id'),
            user_id: auth?.payload?.id
        })
    });
    if (response.ok){
        const { data }  = await response.json();
        // console.log('salvou', purchase_id)
        // return data
        redirect(`/pagamento/${data.purchase_id}`);
    } else {
        const data = await response.json();
        console.log('erro data', data)
        // throw new Error('Erro no realizar o login!');
        return { error: data.message || 'Erro a salvar sua informação!' };
    }
    // return true;
}