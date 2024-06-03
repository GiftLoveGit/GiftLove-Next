'use client'
import React, { useState, ChangeEvent } from "react"
import formatPhone from "@/help/formatPhone";
import toBRL from "@/help/formatCurrency"
import ModalCardPreview from "./ModalCardPreview";

interface FormState {
    name: string
    birthDate: string
    whatsapp: string
    price: string
    message: string
}
interface FormCardProps {
    cardId: string;
}

const FormCard: React.FC<FormCardProps> = ({ cardId }) => {

    const [formData, setFormData] = useState<FormState>({
        name: "",
        birthDate: "",
        whatsapp: "",
        price: "R$ 0,00",
        message: "Olá, tubo bem!",
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedPrice = toBRL(value);
        setFormData((prevState) => ({
            ...prevState,
            price: formattedPrice,
        }));
    };
    const getCurrentDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
        return localISOTime;
    };
    return (
        <>
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
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputDate" className="form-label">
                    Agende o envio
                </label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="inputDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    min={getCurrentDateTime()}
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
                    maxLength={14}
                    value={formatPhone(formData.whatsapp)}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">
                    Valor do Cartão de Presente
                </label>
                <input
                    type="text"
                    placeholder="R$ 10,00"
                    className="form-control"
                    id="inputPrice"
                    name="price"
                    value={formData.price}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="inputMessage" className="form-label">
                    Mensagem
                </label>
                <textarea
                    className="form-control"
                    placeholder="Deixe sua mensagem aqui"
                    id="inputMessage"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="text-center">
                <ModalCardPreview formData={formData} cardId={cardId} />
            </div>
        </>
    )
}
export default FormCard;
