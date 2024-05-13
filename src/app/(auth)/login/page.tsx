"use client"
// import type { Metadata } from "next";
import React, { useEffect, useState, ChangeEvent } from "react"
import LoginIMG from "@/assets/loginimg.svg"
import Link from 'next/link'
import Image from 'next/image'
import maskCpfCnpj from "@/help/formatCpfCnpj";
import initialData from './initialData';
import { LoginType } from "@/models/login.interface";
import { Form } from "@/components/Form";
import { Submit } from "@/components/Submit";
import { loginAction } from "@/actions/auth";

// export const metadata: Metadata = {
//     title: "GiftLove | Login",
//     description: "login",
// };

const Login: React.FC = () => {
    const [login, setLogin] = useState<LoginType>(initialData);
    // useEffect(() => {
    //     document.title = `GiftLove | Login`
    // }, [])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        setLogin({
        ...login,
        [name]: files ? files[0] : value,
        });
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const teste = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    //             method: "POST",
    //             cache: 'no-store',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             }
    //         });
    //         const data = await teste.json();
    //         // handle data here
    //         console.log('data',  data)
    //     };
    
    //     fetchData();
    // }, [login]);
    

    const today = new Date()
    return (
        <div className="d-flex justify-content-center min-vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center p-3 p-sm-0">
                <div className="d-flex flex-column flex-sm-row shadow rounded-4">
                    <div className="col d-none d-sm-flex">
                        <Image className="img-fluid rounded-4" src={LoginIMG} alt="Login" />
                    </div>
                    <div className="col py-5 px-3 px-sm-5">
                        <div className="">
                            <h3 className="glt-blue">Seja Bem Vindo!</h3>
                            <p className="gl-gray">
                                Faça login para acessar seu painel no GiftLoves
                            </p>
                        </div>
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
                                    onChange={handleChange}
                                    value={login.password}
                                />
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
                    </div>
                </div>
            </div>
            <div className="position-absolute d-none d-sm-flex bottom-0">
                <p className="text-muted text-center ">
                    © {today.getFullYear()}{" "}
                    <a className="gl-gray" href="/">
                        GIFTLOVES
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login
