'use client'
import React, { useState, ChangeEvent } from "react"
import formatPhone from "@/help/formatPhone";
import toBRL from "@/help/formatCurrency"
import ModalCardPreview from "./ModalCardPreview";
import { Form, Button } from 'react-bootstrap';

interface FormState {
    name: string
    birthDate: string
    whatsapp: string
    price: string
    messageText: string
}
interface FormCardProps {
    cardId: string;
}

const FormCard: React.FC<FormCardProps> = ({ cardId }) => {

    const [formData, setFormData] = useState<FormState>({
        name: "",
        birthDate: "",
        whatsapp: "",
        price: "",
        messageText: "",
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
            <Form.Group className="mb-3">
                <Form.Label>
                    Nome
                </Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Nome para quem enviará o cartão presente."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>
            {/* <Form.Group className="mb-3">
                <Form.Label htmlFor="inputDate" className="form-Form.Label">
                    Agende o envio
                </Form.Label>
                <Form.Control
                    type="datetime-local"
                    className="form-control"
                    id="inputDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    min={getCurrentDateTime()}
                />
            </Form.Group> */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Whatsapp
                </Form.Label>
                <Form.Control
                    className="form-control"
                    id="inputNumber"
                    name="whatsapp"
                    placeholder="(99) 99999-9999"
                    maxLength={15}
                    value={formatPhone(formData.whatsapp)}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Valor do Cartão de Presente
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="R$ 50,00"
                    className="form-control"
                    id="inputPrice"
                    name="price"
                    value={formData.price}
                    onChange={handlePriceChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Mensagem
                </Form.Label>
                <Form.Control
                    className="form-control"
                    placeholder="Deixe sua mensagem aqui."
                    id="inputMessage"
                    as="textarea"
                    rows={4}
                    name="messageText"
                    value={formData.messageText}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="text-center">
                <ModalCardPreview formData={formData} cardId={cardId} />
            </Form.Group>
        </>
    )
}
export default FormCard;
