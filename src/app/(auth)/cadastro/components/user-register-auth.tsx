"use client";
import React, { useState } from "react";
import { Form } from "@/components/Form";
import { Submit } from "@/components/Submit";
import { RegisterAction } from "@/actions/auth";
// import InputMask from "react-input-mask";
import formatPhone from "@/help/formatPhone";
import Link from 'next/link';
import maskCpfCnpj from "@/help/formatCpfCnpj";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
    name: string;
    cpfCnpj: string;
    phone: string;
    date_birth: string;
    email: string;
    password: string;
//   passwordConfirm: string;
}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {

    const [data, setData] = useState<IUser>({
        name: "",
        cpfCnpj: "",
        phone: "",
        date_birth: "",
        email: "",
        password: "",
        // passwordConfirm: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, files } = event.target;
    //     setLogin({
    //     ...login,
    //     [name]: files ? files[0] : value,
    //     });
    // };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
            setData({
            ...data,
            [name]: files ? files[0] : value,
        });
        // setData((prev) => {
        // return { ...prev, [e.target.name]: e.target.value };
        // });
    };

    return (
        <Form action={RegisterAction} className="mt-4">
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                    <label htmlFor="inputName" className="form-label gl-gray">
                        Nome Completo
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="inputName"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="inputCPF" className="form-label gl-gray">
                        CPF
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCPF"
                        name="cpfCnpj"
                        maxLength={14}
                        onChange={handleChange}
                        value={maskCpfCnpj(data.cpfCnpj || '')}
                        required
                    />
                </div>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                    <label
                        htmlFor="inputNumber"
                        className="form-label gl-gray"
                        data-mask="(00) 0000-0000"
                    >
                        Telefone/Whatsapp
                    </label>
                    <input
                        className="form-control"
                        id="inputNumber"
                        name="phone"
                        maxLength={15}
                        onChange={handleChange}
                        value={formatPhone(data.phone || '')}
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="inputDate" className="form-label gl-gray">
                        Nascimento
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="inputDate"
                        name="date_birth"
                        onChange={handleChange}
                        value={data.date_birth}
                        required
                    />
                </div>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                    <label htmlFor="InputEmail" className="form-label gl-gray">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="InputEmail"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="inputPassword" className="form-label gl-gray">
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                    />
                </div>
            </div>
            <div className="form-check">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    />
                    <label
                    className="form-check-label gl-gray "
                    htmlFor="flexCheckDefault"
                    >
                    Li e concordo com os{" "}
                    <a href="/termos-de-uso" target="_blank">
                        termos de uso
                    </a>{" "}
                    e{" "}
                    <a href="/politica-de-privacidade" target="_blank">
                        política de privacidade
                    </a>
                    .
                    </label>
            </div>
            <div className="mt-4 d-flex gap-3 w-100">
                <Link className="w-100 btn btn-blue" href="/login">
                    Fazer Login
                </Link>
                <Submit type="submit" className="w-100 btn btn-yellow">
                    Cadastrar
                </Submit>
            </div>
        </Form>
    );
}