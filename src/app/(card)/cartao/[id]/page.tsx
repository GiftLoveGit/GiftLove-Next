'use serve'
import Image from "next/image"
import FormCard from "./formCard"
import { getDataCard } from "@/actions/card";

export default async function Show({ params }: { params: { id: string } }) {
    const cardData = await getDataCard(params.id);
    return (
        <div className="container-md mt-5 pt-5">
            <div className="d-flex flex-column flex-sm-row">
                <div className="col d-flex justify-content-center mb-5 mb-sm-0">
                    <Image
                        className="gli-image img-fluid h-100 rounded-4"
                        src={cardData.file_base64}
                        alt={cardData.message}
                        width={250}
                        height={250}
                    />
                </div>
                <div className="col ">
                    <div className="shadow p-4 p-sm-5 rounded-4">
                        <h3 className="glt-blue text-center">Personalize seu cartão</h3>
                        <FormCard cardId={params.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
