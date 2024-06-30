"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import maskCpfCnpj from "@/help/formatCpfCnpj";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { Icons } from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface IUser {
    cpfCnpj: string;
    password: string;
    remember_me: boolean;
}
const schema = z.object({
    cpfCnpj: z.string().min(3, "CPF/CNPJ obrigatório."),
    password: z.string().min(3, "Senha obrigatório."),
});

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {

    const router = useRouter()
    // const { data: session } = useSession()
    const [login, setLogin] = useState<IUser>({
        cpfCnpj: "",
        password: "",
        remember_me: false
    });
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        message: "",
        error: "",
        errors: {
            cpfCnpj: "",
            password: ""
        },
        fieldValues: {
            cpfCnpj: "",
            password: ""
        }
    });
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        const cleanedCpfCnpj = login.cpfCnpj.replace(/\D/g, '');
        const { cpfCnpj, password } = login;
        try {
            schema.parse({ cpfCnpj, password });
            const response = await signIn('credentials', {
                redirect: false,
                cpfCnpj: cleanedCpfCnpj,
                password: login.password,
                remember_me: login.remember_me
            })
            if (!response?.error) {
                router.refresh()
                router.push('/dashboard')
                setPending(false)
            } else {
                setPending(false)
                setFormState(prevState => ({
                    ...prevState,
                    error: 'Email ou senha inválidos.',
                    errors: {
                        cpfCnpj: "",
                        password: ""
                    }
                }));
            }
        } catch (error) {
            setPending(false)
            if (error instanceof ZodError) {
                const errorMap = error.flatten().fieldErrors;
                setFormState(prevState => ({
                    ...prevState,
                    error: "Campo(s) obrigatório(s).",
                    errors: {
                        cpfCnpj: errorMap.cpfCnpj?.[0] ?? "",
                        password: errorMap.password?.[0] ?? "",
                    }
                }));
            }
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked, files } = event.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <>
            <div>
                {formState.error && (
                    <Alert key="danger" variant="danger">
                        {formState.error}
                    </Alert>
                )}
            </div>
            <form className="mt-4" onSubmit={handleLogin}>
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
                        onChange={handleChange}
                        checked={login.remember_me}
                    />
                </Form.Group>

                <div className="mt-4 d-flex gap-3 w-100">
                    <Link
                        className={`w-100 btn btn-yellow ${pending ? "disabled-link" : ""}`}
                        href={pending ? "#" : "/cadastro"}
                        onClick={pending ? (e) => e.preventDefault() : undefined}
                    >
                        Cadastre-se
                    </Link>
                    <Button
                        className="w-100 text-white"
                        variant="info"
                        type="submit"
                        ref={null}
                        disabled={pending}
                    >
                        {pending ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </div>
            </form >
        </>
    );
}