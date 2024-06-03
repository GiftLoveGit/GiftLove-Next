import Link from "next/link"
import cartaoIMG from "@/assets/card.png"
import Image from "next/image"
import { Metadata } from "next";
import { getDataPayments } from "../pagamento/payments";

export const metadata: Metadata = {
    title: "GiftLove | Enviados",
    description: "Enviados",
};
interface PaymentData {
    id: string;
    created_at: string;
    price: number;
    billing_type: string;
    schedule?: string;
    purchase_total: string;
}

export default async function Recevied() {
    const dataPayments: PaymentData[] = await getDataPayments();
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
    const formatPrice = (price: number): string => {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
    };
    // console.log(dataPayments[0].schedule)

    // const dataTable = [
    //     {
    //         id: 1,
    //         card: cartaoIMG,
    //         sender: "Usuario 1",
    //         value: "R$ 10,00",
    //         date: "20/02/2024",
    //     },
    // ]

    return (
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
            <div className="d-flex flex-column flex-sm-row gap-4">
                <div className="col bg-body rounded-4 shadow p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">
                                    Cartão
                                </th>
                                <th scope="col " className="text-center">
                                    Valor
                                </th>
                                <th
                                    scope="col"
                                    className="d-none d-sm-table-cell text-center"
                                >
                                    Data
                                </th>
                                <th scope="col-2 " className="text-center">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPayments.map(({ id, schedule, purchase_total, created_at }) => (
                                <tr key={id}>
                                    <td className="text-center">
                                        <Image
                                            src={cartaoIMG}
                                            alt={id}
                                            className="img-fluid rounded-3"
                                            width={120}
                                        />
                                    </td>
                                    <td className="text-center">{formatPrice(parseFloat(purchase_total))}</td>
                                    <td className="d-none d-sm-table-cell text-center">
                                        {formatDate(created_at)}
                                    </td>
                                    <td className="text-center">
                                        <a
                                            href={`/recebidos/${id}`}
                                            className="btn btn-blue"
                                        >
                                            Visualizar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}