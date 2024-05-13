import React, { useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"
import cartaoIMG from "../assets/card.png"
import InputMask from "react-input-mask"

const CardPreview: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Vizualizar`
  }, [])

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)

  const name = queryParams.get("name") || ""
  const birthDate = queryParams.get("birthDate") || ""
  const whatsapp = queryParams.get("whatsapp") || ""
  const price = queryParams.get("price") || ""
  const message = queryParams.get("message") || ""

  return (
    <div>
      <Navbar />
      <div className="container-md mt-5 pt-5">
        <div className="d-flex flex-column flex-sm-row">
          <div className="col d-flex justify-content-center mb-5 mb-sm-0">
            <img
              className="gli-image img-fluid h-100 rounded-4"
              src={cartaoIMG}
              alt="Cartão Exemplo"
            />
          </div>
          <div className="col ">
            <div className="shadow p-4 p-sm-5 rounded-4">
              <h3 className="glt-blue text-center">Confirme os dados</h3>

              <form className="mt-4">
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Nome"
                    name="name"
                    value={name}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDate" className="form-label">
                    Nascimento dia/mes
                  </label>
                  <InputMask
                    mask="99/99"
                    maskChar="_"
                    placeholder="DD/MM"
                    className="form-control"
                    id="inputDate"
                    name="birthDate"
                    value={birthDate}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputNumber"
                    className="form-label gl-gray"
                    data-mask="(00) 0000-0000"
                  >
                    Whatsapp
                  </label>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar="_"
                    className="form-control"
                    id="inputNumber"
                    placeholder="(__) _____-____"
                    name="whatsapp"
                    value={whatsapp}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPrice" className="form-label">
                    Valor do Cartão de Presente
                  </label>
                  <input
                    type="number"
                    placeholder="R$ 10,00"
                    className="form-control"
                    id="inputPrice"
                    min="0"
                    max="10000"
                    step="1"
                    name="price"
                    value={price}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputMessage" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Deixe sua mensagem aqui"
                    id="inputMessage"
                    rows={4}
                    name="message"
                    value={message}
                    disabled
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <a className="w-100 btn btn-yellow" href="/cartao">
                    Voltar
                  </a>
                  <Link
                    to={`/pagamento?${queryParams}`}
                    className="w-100 btn btn-blue"
                  >
                    Pagamento
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CardPreview
