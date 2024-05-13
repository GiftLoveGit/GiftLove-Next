import React, { useEffect } from "react"
import Sidebar from "../../partials/Sidebar"
import FooterDash from "../../partials/FooterDash"
import cartaoIMG from "../../assets/card.png"

const Send: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Enviados`
  }, [])

  const currentPage = "Enviados"

  const dataTable = [
    {
      id: 1,
      card: cartaoIMG,
      sender: "Usuario 1",
      value: "R$ 10,00",
      date: "20/02/2024",
    },
    {
      id: 2,
      card: cartaoIMG,
      sender: "Usuario 2",
      value: "R$ 10,00",
      date: "20/02/2024",
    },
    {
      id: 3,
      card: cartaoIMG,
      sender: "Usuario 3",
      value: "R$ 10,00",
      date: "20/02/2024",
    },
    {
      id: 4,
      card: cartaoIMG,
      sender: "Usuario 4",
      value: "R$ 10,00",
      date: "20/02/2024",
    },
    {
      id: 5,
      card: cartaoIMG,
      sender: "Usuario 5",
      value: "R$ 10,00",
      date: "20/02/2024",
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
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Cartão
                    </th>
                    <th scope="col" className="text-center">
                      Presenteado
                    </th>
                    <th scope="col " className="text-center">
                      Valor
                    </th>
                    <th
                      scope="col"
                      className="d-none d-sm-table-cell text-center"
                    >
                      Data
                    </th>
                    <th scope="col-2 " className="text-center">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        <img
                          src={item.card}
                          alt={item.card}
                          className="img-fluid rounded-3"
                          width={120}
                        />
                      </td>
                      <td className="text-center">{item.sender}</td>
                      <td className="text-center">{item.value}</td>
                      <td className="d-none d-sm-table-cell text-center">
                        {item.date}
                      </td>
                      <td className="text-center">
                        <a
                          href={`/enviados/${item.id}`}
                          className="btn btn-blue"
                        >
                          Visualizar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FooterDash />
      </div>
    </div>
  )
}

export default Send
