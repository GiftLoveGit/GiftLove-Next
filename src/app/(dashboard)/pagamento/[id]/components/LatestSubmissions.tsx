import Link from "next/link"
import { getDataPayments } from "../../payments"

export default async function LatestSubmissions() {
    const dataPayments: PaymentData[] = await getDataPayments();
    interface PaymentData {
        id: string;
        created_at: string;
        price: number;
        billing_type: string;
    }
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
            // hour12: false,
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <div className="col-lg-4 col-md-5  col bg-body rounded-4 shadow p-4">
            <div className="d-flex justify-content-between">
                <p> Ultimos Envios</p>
                <Link href="/enviados" className="btn btn-outline-blue"> Ver todos</Link>
            </div>
            <ul className="list-group">
            {dataPayments.map(({ id, created_at, price, billing_type }) => (
                    billing_type && (
                        <li
                            key={id}
                            className="list-group-item border-0 p-0 mt-4"
                        >
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="d-flex flex-column">
                                    <p className="mb-0">{formatDate(created_at)}</p>
                                    <small>
                                        {billing_type === "PIX" ? "PIX" : billing_type === "CREDIT_CARD" ? "cartão de crédito" : ""}
                                    </small>
                                </div>
                                <div className="">
                                    <span className="me-3">R$ {price}</span>
                                    <Link className="text-primary text-decoration-none" href={`/enviados/${id}`} >
                                        Visualizar
                                    </Link>
                                </div>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    )
}