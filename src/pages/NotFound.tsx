import React, { useEffect } from "react"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Error 404`
  }, [])
  return (
    <div>
      <Navbar />
      <div className="container-md">
        <div className="mt-5 pt-5 d-flex flex-column align-items-center">
          <h1 className="fw-bold">Error 404</h1>
          <h2>Página não encontrada</h2>
          <p className="mt-4">Ops... Parece que você se perdeu.</p>
          <a href="/" className="btn btn-blue">
            Voltar para Inicio
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotFound
