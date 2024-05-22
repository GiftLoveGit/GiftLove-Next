"use client";
import React, { useState, ChangeEvent } from "react";
import { Form } from "@/components/Form";
import { Submit } from "@/components/Submit";
import Link from 'next/link';
import maskCpfCnpj from "@/help/formatCpfCnpj";
import { loginAction } from "@/actions/auth";

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked, files } = event.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (files ? files[0] : value),
        }));
    };

    return (
        <Form action={loginAction} className="mt-4">
            <div className="mb-4">
                <label
                    htmlFor="cpfFormControlInput1"
                    className=" gl-gray form-label"
                >
                    CPF
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cpfFormControlInput1"
                    placeholder="Digite seu CPF"
                    name="cpfCnpj"
                    maxLength={14}
                    onChange={handleChange}
                    value={maskCpfCnpj(login.cpfCnpj || '')}
                />
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <label
                        htmlFor="senhaFormControlInput1"
                        className=" gl-gray form-label"
                    >
                        Senha
                    </label>

                    <span className="text-end">
                        <a href="?" className="gl-gray">
                            Esqueceu sua senha?
                        </a>
                    </span>
                </div>

                <input
                    type="password"
                    className="form-control"
                    id="senhaFormControlInput1"
                    placeholder="Digite sua Senha"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={login.password}
                />
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    name="remember_me"
                    onChange={handleChange}
                    value={login.remember_me ? "on" : ("" as string)}
                />
                <label
                    className="form-check-label gl-gray "
                    htmlFor="flexCheckDefault"
                >
                    Manter conectado
                </label>
            </div>

            <div className="mt-4 d-flex gap-3 w-100">
                <Link className="w-100 btn btn-yellow" href="/cadastro">
                    Cadastre-se
                </Link>
                <Submit type="submit" className="w-100 btn btn-blue">
                    Entrar
                </Submit>
            </div>
        </Form>
    );
}