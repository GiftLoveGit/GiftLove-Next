import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import cartaoIMG from "../../assets/card.png"
import Sidebar from "../../partials/Sidebar"
import FooterDash from "../../partials/FooterDash"

interface Item {
  id: number
  card: string
  sender: string
  value: string
  date: string
  category: string
}

const ReceviedDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const itemId = id ? parseInt(id) : 0

  useEffect(() => {
    document.title = `GiftLove | Detalhes Recebidos`
  }, [])

  const data: Item[] = [
    {
      id: 1,
      card: cartaoIMG,
      sender: "Usuario 1",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Aniversário da Mãe",
    },
    {
      id: 2,
      card: cartaoIMG,
      sender: "Usuario 2",
      value: "R$ 15,00",
      date: "20/02/2024",
      category: "Aniversário do Pai",
    },
    {
      id: 3,
      card: cartaoIMG,
      sender: "Usuario 3",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Aniversário da Prima",
    },
    {
      id: 4,
      card: cartaoIMG,
      sender: "Usuario 4",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Mensagem de Natal",
    },
    {
      id: 5,
      card: cartaoIMG,
      sender: "Usuario 5",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Casamento",
    },
  ]
  const item = data.find((item) => item.id === itemId)

  if (!item) {
    return <div>Item não encontrado</div>
  }

  const currentPage = `Recebido de ${item.sender}`

  return (
    <div className="">
      <div className="blue-rectangle w-100 position-absolute top-0 z-n1"></div>
      <div className="page-content">
        <Sidebar currentPage={currentPage} />
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
          <div className="d-flex flex-column flex-sm-row gap-4">
            <div className="position-relative  col col-sm-4 bg-body rounded-4 shadow p-4">
              <Link
                className="position-absolute me-3 end-0 btn btn-outline-blue float-end z-1"
                to="/recebidos"
              >
                Voltar
              </Link>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img className="mb-3 rounded-3" src={item.card} alt="" />
                <p>{item.category}</p>
                <p>Presenteador: {item.sender}</p>
                <p>Valor: {item.value}</p>
                <p>Data: {item.date}</p>
              </div>
            </div>
          </div>
        </div>
        <FooterDash />
      </div>
    </div>
  )
}

export default ReceviedDetail
