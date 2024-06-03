"use client"
import React, { useState } from "react"
import logo from "@/assets/logo.png";
import Image from 'next/image'

function Navbar() {
  const [activeItem, setActiveItem] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Redirecionamento para a página de resultados com o termo de pesquisa na URL
    window.location.href = `/resultados?search=${searchTerm}`
  }

  return (
    <div className="gl-pink sticky-top">
      <nav className="container-md navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Image src={logo} alt="GiftLove" height="40" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="d-flex gap-0 gap-sm-3 justify-content-center w-100 navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={`text-light nav-link ${activeItem === "inicio" ? "active" : ""
                    }`}
                  href="/#inicio"
                  onClick={() => handleItemClick("inicio")}
                >
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`text-light nav-link ${activeItem === "sobre-nos" ? "active" : ""
                    }`}
                  href="/#sobre-nos"
                  onClick={() => handleItemClick("sobre-nos")}
                >
                  Sobre Nós
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`text-light nav-link ${activeItem === "destaques" ? "active" : ""
                    }`}
                  href="/#destaques"
                  onClick={() => handleItemClick("destaques")}
                >
                  Destaques
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`text-light nav-link ${activeItem === "categorias" ? "active" : ""
                    }`}
                  href="/#categorias"
                  onClick={() => handleItemClick("categorias")}
                >
                  Categorias
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`text-light nav-link ${activeItem === "duvidas" ? "active" : ""
                    }`}
                  href="/#duvidas"
                  onClick={() => handleItemClick("duvidas")}
                >
                  Duvidas
                </a>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Procurar"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <a className="btn btn-yellow" href="/login">
                Login
              </a>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
