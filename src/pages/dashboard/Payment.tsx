import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "../../partials/Sidebar"
import FooterDash from "../../partials/FooterDash"
import cartaoIMG from "../../assets/card.png"
import InputMask from "react-input-mask"

const Payment: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Pagamento`
  }, [])

  const currentPage = "Pagamento"

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)

  const name = queryParams.get("name") || ""
  const birthDate = queryParams.get("birthDate") || ""
  const whatsapp = queryParams.get("whatsapp") || ""
  const price = queryParams.get("price") || ""
  const message = queryParams.get("message") || ""

  const dataSent = [
    {
      id: 1,
      date: "01 de Março de 2020",
      transitionId: "#MS-415646",
      value: "25,50",
    },
    {
      id: 2,
      date: "03 de Março de 2020",
      transitionId: "#MS-412646",
      value: "25,50",
    },
    {
      id: 3,
      date: "09 de Março de 2020",
      transitionId: "#MS-412646",
      value: "25,50",
    },
    {
      id: 4,
      date: "10 de Março de 2020",
      transitionId: "#MS-412646",
      value: "25,50",
    },
    {
      id: 5,
      date: "12 de Março de 2020",
      transitionId: "#MS-412646",
      value: "25,50",
    },
  ]

  return (
    <div className="">
      <div className="blue-rectangle w-100 position-absolute top-0 z-n1"></div>
      <div className="page-content">
        <Sidebar currentPage={currentPage} />
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
          <div className="d-flex flex-column flex-sm-row gap-4">
            <div className="col bg-body rounded-4 shadow p-4">
              <p>Dados do Cartão</p>
              <div className="d-flex gap-4 flex-column flex-sm-row">
                <div className="col d-flex justify-content-center mb-2 mb-sm-0">
                  <img
                    className="gli-image img-fluid h-100 rounded-4"
                    src={cartaoIMG}
                    alt="Cartão Exemplo"
                  />
                </div>
                <div className="col ">
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
                  <div className="">
                    <label htmlFor="inputMessage" className="form-label">
                      Mensagem
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Deixe sua mensagem aqui"
                      id="inputMessage"
                      rows={4}
                      name="message"
                      disabled
                      value={message}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <p>Métodos de Pagamentos</p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 ">
                  <a className="w-100 btn btn-blue" href="?">
                    Pix
                  </a>
                  <a className="w-100 btn btn-blue" href="?">
                    Cartão de Crédito
                  </a>
                  <a className="w-100 btn btn-blue" href="?">
                    Boleto
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5  col bg-body rounded-4 shadow p-4">
              <div className="d-flex justify-content-between">
                <p> Ultimos Envios</p>
                <a className="btn btn-outline-blue" href="/sent">
                  Ver todos
                </a>
              </div>
              <ul className="list-group">
                {dataSent.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item border-0 p-0 mt-4"
                  >
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <p className="mb-0">{item.date}</p>
                        <small>{item.transitionId}</small>
                      </div>
                      <div className="">
                        <span className="me-3">R$ {item.value}</span>
                        <a className="text-decoration-none text-muted" href="/">
                          <i className="bx bxs-file-pdf"></i> PDF
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <FooterDash />
      </div>
    </div>
  )
}

export default Payment
