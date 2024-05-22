'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from '@/components/Form';
import { postSchedule } from "@/actions/card"
import { Submit } from '@/components/Submit';

interface FormState {
    [key: string]: any;
}

interface ModalCardPreviewProps {
    formData: FormState;
    cardId: string;
}

export default function ModalCardPreview({
    formData,
    cardId
}: ModalCardPreviewProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="w-100 btn btn-blue " onClick={handleShow}>
                Visualizar Cartão
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme os dados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={postSchedule} className="mt-4">
                        <input type="hidden" name="card_id" value={cardId} />
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">
                                Nome
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                name="name"
                                value={formData.name}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDate" className="form-label">
                                Agendado para
                            </label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="inputDate"
                                name="birthDate"
                                value={formData.birthDate}
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
                                value={formData.whatsapp}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPrice" className="form-label">
                                Valor do Cartão de Presente
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPrice"
                                name="price"
                                value={`R$ ${formData.price}`}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputMessage" className="form-label">
                                Mensagem
                            </label>
                            <textarea
                                className="form-control"
                                id="inputMessage"
                                name="message"
                                value={formData.message}
                                rows={5}
                                style={{ resize: 'none' }}
                                readOnly
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <Submit type="submit" className="w-100 btn btn-blue">
                                Pagamento
                            </Submit>
                        </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>

            </Modal.Footer>
        </Modal >
        </>
    );
}