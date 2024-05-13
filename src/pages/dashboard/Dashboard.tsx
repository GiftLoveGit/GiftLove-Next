import React, { useEffect } from "react"
import Sidebar from "../../partials/Sidebar"
import FooterDash from "../../partials/FooterDash"
import TokenGenerator from "../../components/Dashboard/TokenGenerator"

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Dashboard`
  }, [])

  const currentPage = "Dashboard"

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
          <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-4">
            <div className="col bg-body rounded-4 shadow p-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="">
                  <p className="mb-0">Saldo Atual</p>
                  <span>
                    <b>R$ 0,00</b>
                  </span>
                </div>
                <div className="d-flex  gl-blue rounded-circle text-light p-3">
                  <i className="fs-4 bx bx-wallet-alt"></i>
                </div>
              </div>
            </div>
            <div className="col bg-body rounded-4 shadow p-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="">
                  <p className="mb-0"> Total Recebido</p>
                  <span>
                    <b>R$ 0,00</b>
                  </span>
                </div>
                <div className="d-flex  gl-yellow rounded-circle text-light p-3">
                  <i className="fs-4 bx bx-calendar-check"></i>
                </div>
              </div>
            </div>
            <div className="col bg-body rounded-4 shadow p-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="">
                  <p className="mb-0">Total Utilizado</p>
                  <span>
                    <b>R$ 0,00</b>
                  </span>
                </div>
                <div className="d-flex  gl-orange rounded-circle text-light p-3">
                  <i className="fs-4 bx bx-cart-alt"></i>
                </div>
              </div>
            </div>
            <div className="col bg-body rounded-4 shadow p-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="">
                  <p className="mb-0">GIFTLOVE Recebidos</p>
                  <span>
                    <b>0</b>
                  </span>
                </div>
                <div className="d-flex gl-pink rounded-circle text-light p-3">
                  <i className="fs-4 bx bx-gift"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-3 gap-sm-4 mt-3 mt-sm-4">
            <div className="col bg-body rounded-4 shadow p-4">
              <p className="mb-0">Ultimas movimentações</p>
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
            <div className="col col-sm-3 bg-body rounded-4 shadow text-center align-self-sm-start">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#tokeModal"
                className="btn btn-danger rounded-4 py-3 w-100"
              >
                Gerar Token
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="tokeModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Token Gerado
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <TokenGenerator />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button type="button" className="btn btn-blue">
                  Gerar Novo
                </button>
              </div>
            </div>
          </div>
        </div>
        <FooterDash />
      </div>
    </div>
  )
}

export default Dashboard
