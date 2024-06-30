'use client'
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { postSchedule } from "./action";
import { Submit } from '@/components/Submit';
import { Form, Button } from 'react-bootstrap';
import { useFormState, useFormStatus } from "react-dom";
import formatPhone from "@/help/formatPhone";
import Link from 'next/link';
import { useSession } from "next-auth/react"

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
    const { data: session } = useSession()
    console.log('front log', session)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formState, formAction] = useFormState(postSchedule, {
        message: "",
        errors: undefined,
        fieldValues: {
            name: "",
            phone: "",
            price: "",
            messageText: ""
        }
    })
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formState.message === "success") {
            formRef.current?.reset();
        }
    }, [formState])

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
                {formState.message === "unauthenticated" && (
                    <div className="alert alert-danger" role="alert">
                        <Link href="/login">Você precisa realizar o login para essa ação. clique aqui</Link>
                    </div>
                )}
                    <form ref={formRef} action={formAction} className="mt-4">
                        <input type="hidden" name="user_id" value={session?.user?.id} />
                        <Form.Control type="hidden" name="card_id" value={cardId} />
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Nome
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputName"
                                name="name"
                                defaultValue={formData.name}
                                readOnly
                                isInvalid={!!formState.errors?.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors?.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <div className="mb-3">
                            <Form.Label>
                                Agendado para
                            </Form.Label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="inputDate"
                                name="birthDate"
                                defaultValue={formData.birthDate}
                                readOnly
                            />
                        </div> */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Whatsapp
                            </Form.Label>
                            <Form.Control
                                className="form-control"
                                id="inputNumber"
                                name="phone"
                                defaultValue={formatPhone(formData.whatsapp)}
                                readOnly
                                isInvalid={!!formState.errors?.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors?.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Valor do Cartão de Presente
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputPrice"
                                name="price"
                                defaultValue={`${formData.price}`}
                                readOnly
                                isInvalid={!!formState.errors?.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors?.price}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputMessage" className="form-Form.Label">
                                Mensagem
                            </Form.Label>
                            <Form.Control
                                className="form-control"
                                id="inputMessage"
                                name="messageText"
                                defaultValue={formData.messageText}
                                rows={5}
                                as="textarea"
                                style={{ resize: 'none' }}
                                readOnly
                                isInvalid={!!formState.errors?.messageText}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formState.errors?.messageText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Submit type="submit" className="w-100 btn btn-blue">
                                Pagamento
                            </Submit>
                        </Form.Group>
                    </form>
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