'use client'

import { useEffect } from 'react'
import Swal from 'sweetalert2';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);

        // Exibir alerta de erro usando SweetAlert2
        Swal.fire({
            title: 'Erro',
            text: 'Erro ao salvar os dados',
            icon: 'error',
            confirmButtonText: 'Tente novamente',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                // Chama a função reset quando o botão for clicado
                reset();
            }
        });
        // Configurar e usar um mixin para exibir toast notifications
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        // Usar o mixin para exibir um toast como exemplo
        // Toast.fire({
        //     icon: 'success',
        //     title: 'Operação realizada com sucesso'
        // });

    }, [error]);

    return (
        <div>
            <h2>Algo deu errado!</h2>
            {/* <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Tente novamente!
            </button> */}
        </div>
    );
}
