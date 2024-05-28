import Image from "next/image"
import { getPix } from "../../payments";
import { Metadata } from "next";
import CopyButton from "./CopyButton";

export const metadata: Metadata = {
    title: "GiftLove | PIX",
    description: "PIX",
};

export default async function Pix({ params }: { params: { id: string } }) {
    const dataPix = await getPix(params.id);
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };
    return (
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
            <div className="d-flex flex-column flex-sm-row gap-4">
                <div className="col bg-body rounded-4 shadow p-4">
                    <h1 className="text-center">Pagamento via PIX</h1>
                    <h3 className="text-center">Expira até {formatDate(dataPix.expirationDate)}</h3>
                    <div className="d-flex gap-4 flex-column flex-sm-row">
                        <div className="col d-flex justify-content-center mb-2 mb-sm-0">
                            <Image
                                className="gli-image img-fluid h-100 rounded-4"
                                src={dataPix.encoded_image}
                                alt={dataPix.pix_id}
                                width={250}
                                height={250}
                            />
                        </div>
                    </div>
                    <CopyButton payload={dataPix.payload}/>
                </div>
            </div>
        </div>
    )
}