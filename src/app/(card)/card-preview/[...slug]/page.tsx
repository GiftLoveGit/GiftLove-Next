'use serve'
import { getDataCard } from "@/actions/card";
import { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"


export const metadata: Metadata = {
    title: "GiftLove | Vizualizar",
    description: "GiftLove | Vizualizar"
};

export default async function CardPreview({ params }:  { params: { slug: string[] } }) {
    const cardData = await getDataCard(params.slug[0]);
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
                            <h3 className="glt-blue text-center">Confirme os dados</h3>

                            <form className="mt-4">
                                <div className="mb-3">
                                    <label htmlFor="inputName" className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputName"
                                        placeholder="Nome"
                                        name="name"
                                        value={params.slug[1]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputDate" className="form-label">
                                        Nascimento dia/mes
                                    </label>
                                    <input
                                        placeholder="DD/MM"
                                        className="form-control"
                                        id="inputDate"
                                        name="birthDate"
                                        value={params.slug[2]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="inputNumber"
                                        className="form-label gl-gray"
                                        data-mask="(00) 0000-0000"
                                    >
                                        Whatsapp
                                    </label>
                                    <input
                                        className="form-control"
                                        id="inputNumber"
                                        name="whatsapp"
                                        value={params.slug[3]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPrice" className="form-label">
                                        Valor do Cartão de Presente
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="R$ 10,00"
                                        className="form-control"
                                        id="inputPrice"
                                        min="0"
                                        max="10000"
                                        step="1"
                                        name="price"
                                        value={params.slug[4]}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputMessage" className="form-label">
                                        Mensagem
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="inputMessage"
                                        rows={4}
                                        name="message"
                                        value={params.slug[5]}
                                        disabled
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-center gap-3">
                                    <Link className="w-100 btn btn-yellow" href={`/cartao/${params.slug[0]}`}>
                                        Voltar
                                    </Link>
                                    <Link
                                        href={`/pagamento/adlnlansd`}
                                        className="w-100 btn btn-blue"
                                    >
                                        Pagamento
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
