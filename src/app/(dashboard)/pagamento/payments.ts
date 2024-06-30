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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/purchase_payment/credit_card/${formData.get('purchase_id')}`, {
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

export async function pixQrCodeStatic(prevState: any, formData: FormData) {
    'use server'
    const headersAuth = await headersAuthorization();
    const auth = await getAuthData();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/purchase_payment/pix_static/${formData.get('purchase_id')}`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if (response.ok) {
        const { data }   = await response.json();
        data.success = "success"
        return data;
    } else {
        const data = await response.json();
        console.error(data)
        throw new Error(data);
    } 
}

export async function getDataPayments(){
    'use server'
    const auth = await getAuthData();
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/get_payments/${auth.payload.id}`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if(response.ok) {
        const { data } = await response.json();
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
export async function redirectPix(data: string) {
    redirect(`${data}/pix`);
}
export async function getPix(data: string) {
    'use server'
    const headersAuth = await headersAuthorization();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/show_admin/purchase_payment/pix/${data}`, {
        cache: 'no-store',
        headers: headersAuth,
    });
    if(response.ok) {
        const { data } = await response.json();
        return data;
    } else {
        const data = await response.json();
        console.error(data);
        throw new Error(data);
    }            
}