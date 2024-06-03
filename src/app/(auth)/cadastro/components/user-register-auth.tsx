"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Submit } from "@/components/Submit";
import { RegisterAction } from "../actions";
import formatPhone from "@/help/formatPhone";
import Link from 'next/link';
import maskCpfCnpj from "@/help/formatCpfCnpj"; 
interface IUser {
    name: string;
    cpfCnpj: string;
    phone: string;
    date_birth: string;
    email: string;
    password: string;
    terms: boolean;
}

export function UserRegisterForm() {
    const [data, setData] = useState<IUser>({
        name: "",
        cpfCnpj: "",
        phone: "",
        date_birth: "",
        email: "",
        password: "",
        terms: false
        // passwordConfirm: "",
    });

    const [formState, formAction] = useFormState(RegisterAction, {
        message: "",
        errors: undefined,
        fieldValues: {
            name: "",
            cpfCnpj: "",
            phone: "",
            date_birth: "",
            email: "",
            password: "",
            terms: false
        }
    })
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formState.message === "success") {
            formRef.current?.reset();
        }
    }, [formState])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        setData({
            ...data,
            [name]: files ? files[0] : value,
        });
    };

    return (
        <div>
            {formState.message === "success" && (
                <div className="alert alert-success" role="alert">
                    Cadastrado realizado com sucesso.
                </div>
            )}
            <form ref={formRef} action={formAction} className="mt-4">
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
                            defaultValue={formState.fieldValues.name}
                        />
                        {formState.errors?.name && (
                            <span className="text-danger">
                                {formState.errors.name}
                            </span>
                        )}
                    </div>
                    <div className="col">
                        <label htmlFor="inputCPF" className="form-label gl-gray">
                            CPF/CNPJ
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputCPF"
                            name="cpfCnpj"
                            maxLength={18}
                            value={maskCpfCnpj(data.cpfCnpj || '')}
                            // defaultValue={formState.fieldValues.cpfCnpj}
                            onChange={handleChange}
                        />
                        {formState.errors?.cpfCnpj && (
                            <span className="text-danger">
                                {formState.errors.cpfCnpj}
                            </span>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                    <div className="col">
                        <label
                            htmlFor="inputNumber"
                            className="form-label gl-gray"
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
                        // defaultValue={formState.fieldValues.phone}
                        />
                        {formState.errors?.phone && (
                            <span className="text-danger">
                                {formState.errors.phone}
                            </span>
                        )}
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
                            defaultValue={formState.fieldValues.date_birth}
                        />
                        {formState.errors?.date_birth && (
                            <span className="text-danger">
                                {formState.errors.date_birth}
                            </span>
                        )}
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
                            defaultValue={formState.fieldValues.email}
                        />
                        {formState.errors?.email && (
                            <span className="text-danger">
                                {formState.errors.email}
                            </span>
                        )}
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
                            defaultValue={formState.fieldValues.password}
                        />
                        {formState.errors?.password && (
                            <span className="text-danger">
                                {formState.errors.password}
                            </span>
                        )}
                    </div>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input "
                        name="terms"
                        type="checkbox"
                        id="flexCheckDefault"
                    // defaultValue={formState.fieldValues.name}
                    />

                    <label
                        className="form-check-label gl-gray "
                        htmlFor="flexCheckDefault"
                    >
                        Li e concordo com os{" "}
                        <Link href="/termos-de-uso" target="_blank">
                            termos de uso
                        </Link>{" "}
                        e{" "}
                        <Link href="/politica-de-privacidade" target="_blank">
                            política de privacidade
                        </Link>
                        .
                    </label>
                </div>
                {formState.errors?.terms && (
                    <span className="text-danger">
                        {formState.errors.terms}
                    </span>
                )}
                <div className="mt-4 d-flex gap-3 w-100">
                    <Link className="w-100 btn btn-blue" href="/login">
                        Fazer Login
                    </Link>
                    <Submit type="submit" className="w-100 btn btn-yellow">
                        Cadastrar
                    </Submit>
                </div>
            </form>
        </div>
    );
}