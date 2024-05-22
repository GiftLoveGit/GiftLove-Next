"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from '@/actions/headersAuthorization';
import { revalidatePath } from 'next/cache'
import { getAuthData } from '@/actions/auth';
import cleanedFormatPrice from '@/help/cleanedFormatPrice';

export async function getDataPayment(id: string) {
    'use server';
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/payment/${id}`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if (response.ok){
        const dados = await response.json();
        // const {data : {id, price, message, file_base64}} = await response.json();
        // let dados = { id, price, message, file_base64 };
        // revalidatePath('/(dashboard)/pagamento/[id]', 'page')
        return dados
    } else {
        const dados = await response.json();
        console.log(dados)
        throw new Error('Erro ao obter dados do cartão de presente!');
    }
}
// Metodo de pagamento via cartão de crédito
export async function purchasePayment(prevState: any, formData: FormData) {
    'use server'
    const headersAuth = await headersAuthorization();
    const auth = await getAuthData();

    const cpfCnpj = formData.get('cpfCnpj') as string;
    const postalCode = formData.get('postalCode') as string;
    const phone = formData.get('phone') as string;
    const number_credit = formData.get('number_credit') as string;

    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const cleanedPostalCode = postalCode.replace(/\D/g, '');
    const cleanedPhone = phone.replace(/\D/g, '');
    const cleanedNumber_credit = number_credit.replace(/\D/g, '');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/purchase_payment/${formData.get('purchase_id')}`, {
        method: "POST",
        cache: 'no-store',
        headers: headersAuth,
        body: JSON.stringify({
            name: formData.get('name'),
            cpfCnpj: cleanedCpfCnpj,
            email: formData.get('email'),
            postalCode: cleanedPostalCode,
            logradouro: formData.get('logradouro'),
            addressNumber: formData.get('addressNumber'),
            phone: cleanedPhone,
            number_credit: cleanedNumber_credit,
            holder_name: formData.get('holder_name'),
            expiration_month: formData.get('expiration_month'),
            expiration_year: formData.get('expiration_year'),
            cvv: formData.get('cvv'),
            user_id: auth?.payload?.id
        })
    });
    if (response.ok) {
        // const { data }  = await response.json();
        const { data }   = await response.json();
        // console.log('mano ', data)
        // revalidatePath('/enviados')
        // redirect('/enviados')
        // data.success = data
        return data;
    } else {
        const data = await response.json();
        console.error(data)
        // return error
        throw new Error(data);
    }
}

// importas dados de taxas para o pagamento
export async function getDataCreditCardPayment(id: string){
    'use server'
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/get_fees`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if(response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erro ao obter dados de taxas');
    }
}

export async function redirectEnviados(data: Boolean ) {
    if(data) {
        redirect('/enviados')
    }
}




// export async function postSchedule(prevState: any, formData: FormData) {
//     'use server';
//     const headersAuth = await headersAuthorization();
//     const auth = await getAuthData();
//     const price = formData.get('price') as string;
//     const cleanedPrice = cleanedFormatPrice(price)
//     const whatsapp = formData.get('whatsapp') as string;
//     const cleanedWhatsapp = whatsapp.replace(/\D/g, '');
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/schedules`, {
//         method: "POST",
//         cache: 'no-store',
//         headers: headersAuth,
//         body: JSON.stringify({
//             name: formData.get('name'),
//             whatsapp: cleanedWhatsapp,
//             birthDate: formData.get('birthDate'),
//             price: cleanedPrice,
//             message: formData.get('message'),
//             card_id: formData.get('card_id'),
//             user_id: auth?.payload?.id
//         })
//     });
//     if (response.ok){
//         const { data }  = await response.json();
//         // console.log('salvou', purchase_id)
//         // return data
//         redirect(`/pagamento/${data.purchase_id}`);
//     } else {
//         const data = await response.json();
//         console.log('erro data', data)
//         // throw new Error('Erro no realizar o login!');
//         return { error: data.message || 'Erro a salvar sua informação!' };
//     }
//     // return true;
// }