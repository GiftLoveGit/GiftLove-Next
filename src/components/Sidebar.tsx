'use client'
import React, { useState, useEffect } from "react"
import Link from 'next/link'
import Logo from "@/assets/logo.png"
import Image from "next/image"
import { FaDesktop, FaDoorClosed } from "react-icons/fa"
import { usePathname } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";
import { PersonCircle } from "react-bootstrap-icons"
import { logoutAction } from "@/actions/auth"
import { MouseEvent } from 'react';
import { signOut, useSession } from "next-auth/react"
// import { getServerSession } from "next-auth"

// interface SidebarProps {
//   currentPage: string
// }

export default function Sidebar() {
    // const session = await getServerSession();
    // {session && <li>componet</li>}
    const { data: session } = useSession()
    // console.log('[SESSION SIDEBAR]', session)
    const pathname = usePathname();
    const [showOffcanvas, setShowOffcanvas] = useState(false) // Define o estado inicial com base no tamanho da tela

    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas)
    }

    // Função para atualizar o estado com base no tamanho da tela
    const handleResize = () => {
        setShowOffcanvas(window.innerWidth >= 992)
    }

    // Adiciona um event listener para detectar alterações no tamanho da tela
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowOffcanvas(window.innerWidth >= 992);

            const handleResize = () => {
                setShowOffcanvas(window.innerWidth >= 992);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [])
    const handleSubmit = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const data = await logoutAction();
        if (data) signOut()        
    }
    const toTitleCase = (str: string): string => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const formattedPathname = pathname
        .replace(/^\//, '')
        .split('/')
        .map(part => toTitleCase(part))
        .join(' ');

    return (
        <div className="mt-20" style={{ marginTop: '30px' }}>
            {/* Botão que aparecerá em telas menores */}
            <div className="d-flex justify-content-between align-items-center mb-3 px-2 px-sm-5 mt-4 text-light">
                <h4 className="fw-bold">{formattedPathname}</h4>
                <p className="d-none d-sm-flex fw-bold">
                    <PersonCircle className="fs-4 me-2 d-sm-flex d-none" />
                    {session?.user?.name}
                </p>
                <div className=" d-lg-none">
                    <PersonCircle className="fs-4 me-2 d-sm-flex d-none" />
                    <span className=" d-lg-none" onClick={toggleOffcanvas}>
                        <TiThMenu />
                    </span>
                </div>
            </div>

            {/* Offcanvas sempre visível em telas maiores */}
            <div
                className={`offcanvas offcanvas-start custom-offcanvas border-0 shadow m-0 m-sm-4 rounded-4 ${showOffcanvas ? "show" : ""}`}
                data-bs-scroll="true"
                tabIndex={-1}
                data-bs-backdrop="false"
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
            >
                <div className="offcanvas-header">
                    <div className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                        <Link href="/">
                            <Image
                                className="img-fluid"
                                src={Logo}
                                alt="Início"
                                style={{ filter: "contrast(0.1)", width: "80%" }}
                            />
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="btn-close d-lg-none"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={toggleOffcanvas}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column sidebar">
                        <li className="nav-item py-2">
                            <Link
                                href="/dashboard"
                                className={`nav-link gl-gray rounded-3 ${pathname === "/dashboard" ? "active" : ""}`}
                            >
                                <FaDesktop /> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link
                                href="/"
                                className={`nav-link gl-gray rounded-3`}
                            >
                                <FaDesktop /> Site
                            </Link>
                        </li>
                        {/* <li className="nav-item py-2">
              <Link
                href="/recebidos"
                className={`nav-link gl-gray rounded-3 ${pathname === "/recebidos" ? "active" : ""}`}
              >
                <i className="bx bxs-calendar-check"></i> Recebidos
              </Link>
            </li> */}
                        <li className="nav-item py-2">
                            <Link
                                href="/enviados"
                                className={`nav-link gl-gray rounded-3 ${pathname === "/enviados" ? "active" : ""}`}
                            >
                                <i className="bx bxs-calendar"></i> Enviados
                            </Link>
                        </li>
                        {/* <li className="nav-item py-2">
              <Link
                href="/extratos"
                className={`nav-link gl-gray rounded-3 ${pathname === "/extratos" ? "active" : ""}`}
              >
                <FaCreditCard /> Extratos
              </Link>
            </li> */}
                        <p className="px-3 mb-2 mt-3 fw-bold">Perfil</p>
                        <li className="nav-item py-2">
                            <Link
                                href="/minha-conta"
                                className={`nav-link gl-gray rounded-3 ${pathname === '/minha-conta' ? 'active' : ''}`}
                            >
                                <PersonCircle className="me-2" /> Minha Conta
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link gl-gray rounded-3" href="#" onClick={handleSubmit}>
                                <FaDoorClosed className="me-2" /> Sair
                            </Link>
                            {/* <Form action={logoutAction}>
                <button type="submit" className="nav-link gl-gray rounded-3"><FaDoorClosed className="me-2" /> Sair</button>
              </Form> */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
