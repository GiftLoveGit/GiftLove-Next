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
    }, [error, reset]);

    return (
        <div className="container mt-5">
            <div className="alert alert-danger" role="alert">
                <h2>Algo deu errado!</h2>
                <button
                    className="btn btn-primary"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Tente novamente!
                </button>
            </div>
        </div>
    );
}
