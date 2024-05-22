
import cartaoIMG from "@/assets/card.png"
import Image from "next/image"
import LatestSubmissions from "./components/LatestSubmissions"
import { Metadata } from "next";
import { getDataPayment } from '../payments';
import ModalCreditCard from "./components/ModalCreditCard";

export const metadata: Metadata = {
    title: "GiftLove | Pagamento",
    description: "Pagamento",
};

export default async function Payment({ params }: { params: { id: string } }) {
    const { purchase, purchase: { schedule }, giftCard, feesPayment } = await getDataPayment(params.id)

    return (
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
            <div className="d-flex flex-column flex-sm-row gap-4">
                <div className="col bg-body rounded-4 shadow p-4">
                    <p>Dados do Cartão</p>
                    <div className="d-flex gap-4 flex-column flex-sm-row">
                        <div className="col d-flex justify-content-center mb-2 mb-sm-0">
                            <Image
                                className="gli-image img-fluid h-100 rounded-4"
                                src={giftCard.file_base64}
                                alt={giftCard.message}
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className="col ">
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
                                    value={schedule.name}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDate" className="form-label">
                                    Agendamento para
                                </label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="inputDate"
                                    name="birthDate"
                                    value={schedule.scheduled_to}
                                    readOnly
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
                                    value={schedule.whatsapp}
                                    readOnly
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
                                    value={purchase.price}
                                    readOnly
                                />
                            </div>
                            <div className="">
                                <label htmlFor="inputMessage" className="form-label">
                                    Mensagem
                                </label>
                                <textarea
                                    className="form-control"
                                    placeholder="Deixe sua mensagem aqui"
                                    id="inputMessage"
                                    rows={4}
                                    name="message"
                                    readOnly
                                    value={schedule.message}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 ">
                        <p className="text-center">Métodos de Pagamentos</p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 ">
                            <a className="w-100 btn btn-blue" href="?">
                                Pix
                            </a>
                            <ModalCreditCard
                                price={purchase.price}
                                feesPayment={feesPayment.fees}
                                purchase_id={purchase.id}
                            />
                        </div>
                    </div>
                </div>
                <LatestSubmissions />
            </div>
        </div>
    )
}