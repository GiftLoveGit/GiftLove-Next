'use client'
import React, { useEffect } from "react";
import { Submit } from "@/components/Submit";'react-bootstrap';
import { useFormState } from "react-dom";
import { pixQrCodeStatic } from '../../payments';
import Swal from 'sweetalert2';
import { redirectPix } from '../../payments';

interface Response {
    error?: string | null;
    success?: string | null;
    errors?: any | null;
    data?: any | null;
}
interface PurchaseId {
    purchase_id: string;
}
export default function PixGeneration({ purchase_id }: PurchaseId) {

    const [state, formAction] = useFormState(pixQrCodeStatic, { error: null, success: null, errors: null });
    useEffect(() => {
        if (state.success === 'success') {
            Swal.fire({
                title: 'Sucesso',
                text: 'Seu PIX Foi Gerado Com Sucesso!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    redirectPix(purchase_id)
                }
            });
        }
    }, [state, purchase_id]);
    return (
        <>
            <form action={formAction} className="w-100">
                <input name="purchase_id" type="hidden" value={purchase_id} />
                <Submit type="submit" className="w-100 btn btn-blue" >
                    PIX
                </Submit>
            </form >
        </>
    )

}