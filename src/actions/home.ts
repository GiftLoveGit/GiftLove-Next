"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { headersAuthorization } from './headersAuthorization';
import { revalidatePath } from 'next/cache';

export async function getDataGiftCards() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/gift_cards?raw_list`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    
    if (response.ok){
        const data = await response.json();
        revalidatePath('/');
        return data     
    } else {
        throw new Error('Erro ao obter dados de cartões de presente!');
    }
}
export async function getDataCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/categories?raw_list`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    if (response.ok){
        const data = await response.json();
        revalidatePath('/');
        return data
    } else {
        throw new Error('Erro ao obter dados de categorias!');
    }
}