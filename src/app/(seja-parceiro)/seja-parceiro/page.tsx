'use client'
import React, { useState, useRef, useEffect, FocusEvent, useCallback } from "react";
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';
import formatPhone from "@/help/formatPhone";
import maskCpfCnpj from "@/help/formatCpfCnpj";
import maskCEP from "@/help/formatCep";
import { Icons } from "@/components/icons";
import { z } from 'zod';
import Swal from 'sweetalert2';

const validarCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};

const validarCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
};

const validarCelular = (telefone: string): boolean => {
    // const regex = /^\(?[1-9]{2}\)? ?9?[6-9][0-9]{3}-?[0-9]{4}$/;
    // return regex.test(telefone);

    const cleanedTelefone = telefone.replace(/\s+/g, '').replace(/[\(\)-]/g, '');
    const regex = /^\(?[1-9]{2}\)? ?9[6-9][0-9]{3}-?[0-9]{4}$/;
    return regex.test(cleanedTelefone);
};
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

const formSchema = z.object({
    name: z.string().min(1, "Nome obrigatório."),
    name_store: z.string().min(1, "Nome da loja é obrigatório."),
    cpfCnpj: z.string().refine((value) => validarCPF(value) || validarCNPJ(value), {
        message: "CPF ou CNPJ inválido.",
    }),
    phone: z.string().refine((value) => validarCelular(value), {
        message: "Número de telefone inválido.",
    }),
    date_birth: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }, {
        message: "Data de nascimento inválida.",
    }),
    email: z.string().email("Email inválido."),
    address: z.string().min(3, "Logradouro obrigatório."),
    cep: z.string().min(3, "CEP obrigatório."),
    number: z.string().min(1, "Número obrigatório."),
    logo: z.any().refine(
        (file) => {
            if (!file) return false;
            const size = file.size;
            return size <= MAX_FILE_SIZE;
        },
        `O tamanho máximo da imagem é 5 MB.`
    ).refine(
        (file) => {
            if (!file) return false;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        },
        "Apenas os formatos .jpg, .jpeg, .png, .gif e .webp são suportados."
    ),
    site: z.string(),
    facebook: z.string(),
    instagram: z.string(),
    tiktok: z.string(),
    category_id: z.string().min(1, "Categoria é obrigatória."),
});

interface IDataForm {
    name: string;
    address: string;
    cpfCnpj: string;
    phone: string;
    date_birth: string;
    email: string;
    name_store: string;
    cep: string;
    number: string;
    site: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    category_id: string;
    logo: File | null;
}
interface ICategory {
    id: string;
    name: string;
    validate: boolean;
}
interface FormErrors {
    [key: string]: string;
}

export default function BePartner() {
    const [category, setCategory] = useState<ICategory[] | null>(null);
    const [errorsForm, setErrorsForm] = useState<FormErrors>({});
    const [statusDisabled, setStatusDisabled] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [formData, setFormData] = useState<IDataForm>({
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
        category_id: "",
        logo: null
    });

    const handleBuscaCep = async (event: FocusEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cep = value;
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
                cache: 'no-store',
            });
            const data = await response.json();
            setFormData({
                ...formData,
                address: data?.logradouro,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/showcase/categories_stores?raw_list`, {
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                const { data } = await res.json();
                setCategory(data);
            } catch (error) {
                console.error('Erro ao buscar as categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    const handleChange = (event: React.ChangeEvent<FormControlElement>) => {
        const target = event.target;
        const { name, value } = target;
        const files = (target as HTMLInputElement).files;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setStatusDisabled(true)
        setMessage("")
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const formattedErrors: FormErrors = {};
            result.error.errors.forEach((error) => {
                formattedErrors[error.path[0]] = error.message;
            });
            setErrorsForm(formattedErrors);
            setStatusDisabled(false)
            return;
        }
        setErrorsForm({});
        const bodyFormData = new FormData();
        if (formData.logo) {
            bodyFormData.append("logo", formData.logo);
        }
        bodyFormData.append("name", formData.name);
        bodyFormData.append("cpfCnpj", formData.cpfCnpj.replace(/\D/g, ''));
        bodyFormData.append("phone", formData.phone.replace(/\D/g, ''));
        bodyFormData.append("date_birth", formData.date_birth);
        bodyFormData.append("email", formData.email);
        bodyFormData.append("address", formData.address);
        bodyFormData.append("name_store", formData.name_store);
        bodyFormData.append("cep", formData.cep.replace(/\D/g, ''));
        bodyFormData.append("number", formData.number);
        bodyFormData.append("site", formData.site);
        bodyFormData.append("facebook", formData.facebook);
        bodyFormData.append("instagram", formData.instagram);
        bodyFormData.append("tiktok", formData.tiktok);
        bodyFormData.append("category_id", formData.category_id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register_shop`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'User-agent': 'learning app',
            },
            cache: 'no-store',
            body: bodyFormData
        })
        if (!res.ok) {
            setStatusDisabled(false)
            const { errors } = await res.json();
            const errorMessage = Object.keys(errors).map(key => {
                return `${errors[key].join(', ')}`;
            }).join('\n');

            Swal.fire({
                title: 'Erro',
                text: `Erro ao cadastrar parceiro!\n${errorMessage}`,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-danger',
                },
            });
            setErrorsForm(errors)
            return;
        }
        setMessage("success")
        setErrorsForm({});
        setStatusDisabled(false)
    }
    useEffect(() => {
        if (message === "success") {
            Swal.fire({
                title: 'Sucesso',
                text: 'Parceiro cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            });
        }
    }, [message])

    return (
        <Container className="mt-5">
            <h3 className="text-secondary text-center">Dados do Parceiro</h3>
            <Card>
                <Card.Body>
                    <form onSubmit={handleSubmit} >
                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="name_store">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select
                                        aria-label="Category"
                                        name="category_id"
                                        isInvalid={!!errorsForm?.category_id}
                                        value={formData.category_id}
                                        onChange={handleChange}
                                    >
                                        <option>.::Selecione::.</option>
                                        {category && category.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.category_id}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="logo">
                                    <Form.Label>Logo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        isInvalid={!!errorsForm?.logo}
                                        name="logo"
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.logo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="name_store">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errorsForm?.name_store}
                                        placeholder="Digite o nome da empresa"
                                        name="name_store"
                                        value={formData.name_store}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.name_store}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="cep">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errorsForm?.cep}
                                        placeholder="Digite o CEP"
                                        name="cep"
                                        maxLength={9}
                                        value={maskCEP(formData.cep ?? '')}
                                        onChange={handleChange}
                                        onBlur={handleBuscaCep}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.cep}
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
                                        isInvalid={!!errorsForm?.address}
                                        placeholder="Digite seu endereço"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="number">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errorsForm?.number}
                                        placeholder="Digite o número do endereço"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.number}
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
                                        isInvalid={!!errorsForm?.site}
                                        value={formData.site}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.site}
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
                                        isInvalid={!!errorsForm?.facebook}
                                        value={formData.facebook}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.facebook}
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
                                        isInvalid={!!errorsForm?.instagram}
                                        value={formData.instagram}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.instagram}
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
                                        isInvalid={!!errorsForm?.tiktok}
                                        value={formData.tiktok}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.tiktok}
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
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errorsForm?.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.name}
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
                                        isInvalid={!!errorsForm?.email}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.email}
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
                                        isInvalid={!!errorsForm?.cpfCnpj}
                                        value={maskCpfCnpj(formData.cpfCnpj || '')}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.cpfCnpj}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Group controlId="date_birth">
                                    <Form.Label>Data de nascimento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_birth"
                                        isInvalid={!!errorsForm?.date_birth}
                                        value={formData.date_birth}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.date_birth}
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
                                        isInvalid={!!errorsForm?.phone}
                                        onChange={handleChange}
                                        value={formatPhone(formData.phone || '')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorsForm?.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="text-center">
                            <Button
                                type="submit"
                                className="btn btn-success"
                                disabled={statusDisabled}
                            >
                                {statusDisabled ? (
                                    <>
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        Carregando...
                                    </>
                                ) : (
                                    "Cadastrar"
                                )}

                            </Button>
                        </Form.Group>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}
