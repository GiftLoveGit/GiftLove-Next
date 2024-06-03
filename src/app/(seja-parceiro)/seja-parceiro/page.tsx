'use client'
import React, { useState, useRef, useEffect, FocusEvent } from "react";
import { useFormState } from "react-dom";
import { Submit } from "@/components/Submit";
import { RegisterAction } from "./actions";
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';
import formatPhone from "@/help/formatPhone";
import maskCpfCnpj from "@/help/formatCpfCnpj";
import maskCEP from "@/help/formatCep";

interface IDataForm {
    cpfCnpj: string;
    phone: string;
    cep: string;
    address: string;
}

export default function BePartner() {
    const [data, setData] = useState<IDataForm>({
        cpfCnpj: "",
        phone: "",
        cep: "",
        address: ""
    });
    const [formState, formAction] = useFormState(RegisterAction, {
        message: "",
        errors: undefined,
        fieldValues: {
            name: "",
            address: "",
            cpfCnpj: "",
            phone: "",
            date_birth: "",
            email: "",
            name_store: "",
            cep: "",
            number: "",
            site: "",
            facebook: "",
            instagram: "",
            tiktok: "",
        }
    });
    
    const handleBuscaCep = async (event: FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cep = value;
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
                cache: 'no-store',
            });
            const dado = await response.json();
            setData({
                ...data,
                address: dado.logradouro,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        setData({
            ...data,
            [name]: files ? files[0] : value,
        });
    };
    const successMessageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formState.message === "success") {
            formRef.current?.reset();
            successMessageRef.current?.focus();
        }
    }, [formState]);

    return (
        <Container className="mt-5">
            {formState.message === "success" && (
                <div className="alert alert-success" role="alert" tabIndex={-1} ref={successMessageRef}>
                    Cadastrado realizado com sucesso.
                </div>
            )}
            <h3 className="text-secondary text-center">Dados da Empresa</h3>
            <Card>
                <Card.Body>
                    <form ref={formRef} action={formAction}>
                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="name_store">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!formState.errors?.name_store}
                                        placeholder="Digite o nome da empresa"
                                        name="name_store"
                                        defaultValue={formState.fieldValues.name_store}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.name_store}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="cep">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!formState.errors?.cep}
                                        placeholder="Digite o CEP"
                                        name="cep"
                                        maxLength={9}
                                        value={maskCEP(data.cep ?? '')}
                                        onChange={handleChange}
                                        onBlur={handleBuscaCep}
                                        // defaultValue={formState.fieldValues.cep}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.cep}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="address">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!formState.errors?.address}
                                        placeholder="Digite seu endereço"
                                        name="address"
                                        // defaultValue={formState.fieldValues.address}
                                        value={data.address}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="number">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!formState.errors?.number}
                                        placeholder="Digite o número do endereço"
                                        name="number"
                                        defaultValue={formState.fieldValues.number}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.number}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="site">
                                    <Form.Label>Site</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Digite seu site"
                                        name="site"
                                        isInvalid={!!formState.errors?.site}
                                        defaultValue={formState.fieldValues.site}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.site}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="facebook">
                                    <Form.Label>Facebook</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Digite seu Facebook"
                                        name="facebook"
                                        isInvalid={!!formState.errors?.facebook}
                                        defaultValue={formState.fieldValues.facebook}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.facebook}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="instagram">
                                    <Form.Label>Instagram</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Digite seu Instagram"
                                        name="instagram"
                                        isInvalid={!!formState.errors?.instagram}
                                        defaultValue={formState.fieldValues.instagram}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.instagram}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="tiktok">
                                    <Form.Label>Tiktok</Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Digite seu Tiktok"
                                        name="tiktok"
                                        isInvalid={!!formState.errors?.tiktok}
                                        defaultValue={formState.fieldValues.tiktok}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.tiktok}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <hr style={{ backgroundColor: '#FFF' }} />
                        <Form.Group>
                            <Form.Label>Dados de acesso do administrador da empresa:</Form.Label>
                        </Form.Group>

                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="nomeadm">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o nome do administrador"
                                        name="name"
                                        isInvalid={!!formState.errors?.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu email"
                                        name="email"
                                        isInvalid={!!formState.errors?.email}
                                        defaultValue={formState.fieldValues.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="cpfCnpj">
                                    <Form.Label>CPF/CNPJ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu CPF"
                                        name="cpfCnpj"
                                        maxLength={18}
                                        isInvalid={!!formState.errors?.cpfCnpj}
                                        value={maskCpfCnpj(data.cpfCnpj || '')}
                                        // defaultValue={formState.fieldValues.cpfCnpj}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.cpfCnpj}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="date_birth">
                                    <Form.Label>Data de nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_birth"
                                        isInvalid={!!formState.errors?.date_birth}
                                        defaultValue={formState.fieldValues.date_birth}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.date_birth}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="phone">
                                    <Form.Label>Whatsapp</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Digite seu WhatsApp"
                                        name="phone"
                                        maxLength={15}
                                        isInvalid={!!formState.errors?.phone}
                                        // defaultValue={formState.fieldValues.phone}
                                        onChange={handleChange}
                                        value={formatPhone(data.phone || '')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Submit type="submit" className="btn btn-success">
                                Cadastrar
                            </Submit>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}
