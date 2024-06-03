"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Submit } from "@/components/Submit";
import Link from 'next/link';
import maskCpfCnpj from "@/help/formatCpfCnpj";
import { loginAction } from "./action";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface IUser {
    cpfCnpj: string;
    password: string;
    remember_me: boolean;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {

    const [login, setLogin] = useState<IUser>({
        cpfCnpj: "",
        password: "",
        remember_me: false
    });
    const [formState, formAction] = useFormState(loginAction, {
        message: "",
        error: "",
        errors: undefined,
        fieldValues: {
            cpfCnpj: "",
            password: ""
        }
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked, files } = event.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (files ? files[0] : value),
        }));
    };
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formState.message === "success") {
            formRef.current?.reset();
        }
    }, [formState])

    return (
        <>
            <div>
                {formState.error && (
                    <Alert key="danger" variant="danger">
                        {formState.error}
                    </Alert>
                )}
            </div>
            <form ref={formRef} action={formAction} className="mt-4">
                <Form.Group controlId="cpfCnpj">
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite seu CPF/CNPJ"
                        name="cpfCnpj"
                        maxLength={18}
                        onChange={handleChange}
                        value={maskCpfCnpj(login.cpfCnpj || '')}
                        isInvalid={!!formState.errors?.cpfCnpj}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors?.cpfCnpj}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <div className="d-flex justify-content-between">
                        <Form.Label>Senha</Form.Label>
                        <span className="text-end">
                            <Link href="?" className="gl-gray">
                                Esqueceu sua senha?
                            </Link>
                        </span>
                    </div>
                    <Form.Control
                        type="password"
                        placeholder="******************"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={login.password}
                        isInvalid={!!formState.errors?.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formState.errors?.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="remember_me">
                    <Form.Check
                        type="checkbox"
                        label="Manter conectado"
                        name="remember_me"
                    />
                </Form.Group>

                <div className="mt-4 d-flex gap-3 w-100">
                    <Link className="w-100 btn btn-yellow" href="/cadastro">
                        Cadastre-se
                    </Link>
                    <Submit type="submit" className="w-100 btn btn-blue">
                        Entrar
                    </Submit>
                </div>
            </form >
        </>
    );
}