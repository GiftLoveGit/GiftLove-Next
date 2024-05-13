import React, { useEffect } from "react"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"
import SejaParceiro from "../components/Home/SejaParceiro"

const BePartner = () => {
  useEffect(() => {
    document.title = `GiftLove | Seja Parceiro`
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container-md">
        <div className="mt-5 pt-3">
          <SejaParceiro />
          <form action="">
            <div className="d-flex flex-column flex-sm-row gap-4">
              <div className="col mt-5">
                <p className="gl-gray">Dados da Empresa</p>
                <div className="mb-4">
                  <label
                    htmlFor="nomeFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeFormControlInput1"
                    placeholder="Digite o nome da empresa"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="enderecoFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="enderecoFormControlInput1"
                    placeholder="Digite seu endereço"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="siteFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Site
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="siteFormControlInput1"
                    placeholder="Digite seu site"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="facebookFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Facebook
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="facebookFormControlInput1"
                    placeholder="Digite seu facebook"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="instagramFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Instagram
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="instagramFormControlInput1"
                    placeholder="Digite seu instagram"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tiktokFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Tiktok
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tiktokFormControlInput1"
                    placeholder="Digite seu tiktok"
                  />
                </div>
              </div>
              <div className="col mt-2 mt-sm-5">
                <p className="gl-gray">Administrador da Empresa</p>
                <div className="mb-4">
                  <label
                    htmlFor="nomeadmFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeadmFormControlInput1"
                    placeholder="Digite o administrador"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cpfFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    CPF
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cpfFormControlInput1"
                    placeholder="Digite seu cpf"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="whatsappFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Whatsapp
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="whatsappFormControlInput1"
                    placeholder="Digite seu whatsapp"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="emailFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailFormControlInput1"
                    placeholder="Digite seu email"
                  />
                </div>
                <div className="">
                  <p className="gl-gray">Taxas e Prazos</p>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="taxoption"
                      id="option1"
                    />
                    <label className="form-check-label" htmlFor="option1">
                      3% em 30 dias
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="taxoption"
                      id="option2"
                    />
                    <label className="form-check-label" htmlFor="option2">
                      5% em 2 dias
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-blue">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BePartner
