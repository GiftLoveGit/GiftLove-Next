'use client'
import React, { useEffect } from "react"
// import { useParams } from "react-router-dom"
import cartaoIMG from "@/assets/card.png"
import Sidebar from "@/partials/Sidebar"
import FooterDash from "@/partials/FooterDash"
import Link from "next/link"
import Image from "next/image"

interface Item {
  id: number
  card: any;
  sent: string
  message: string
  value: string
  date: string
  category: string
}

const SentDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>()
  const id = 2
  const itemId = id ? id : 0

  useEffect(() => {
    document.title = `GiftLove | Detalhes Enviados`
  }, [])

  const data: Item[] = [
    {
      id: 1,
      card: cartaoIMG,
      sent: "Usuario 1",
      message: "Mensagem cartão",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Aniversário da Mãe",
    },
    {
      id: 2,
      card: cartaoIMG,
      sent: "Usuario 2",
      message: "Mensagem cartão",
      value: "R$ 15,00",
      date: "20/02/2024",
      category: "Aniversário do Pai",
    },
    {
      id: 3,
      card: cartaoIMG,
      sent: "Usuario 3",
      message: "Mensagem cartão",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Aniversário da Prima",
    },
    {
      id: 4,
      card: cartaoIMG,
      sent: "Usuario 4",
      message: "Mensagem cartão",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Mensagem de Natal",
    },
    {
      id: 5,
      card: cartaoIMG,
      sent: "Usuario 5",
      message: "Mensagem cartão",
      value: "R$ 10,00",
      date: "20/02/2024",
      category: "Casamento",
    },
  ]
  const item = data.find((item) => item.id === itemId)

  if (!item) {
    return <div>Item não encontrado</div>
  }

  const currentPage = `Enviado para ${item.sent}`

  return (
    <div className="">
      <div className="blue-rectangle w-100 position-absolute top-0 z-n1"></div>
      <div className="page-content">
        <Sidebar currentPage={currentPage} />
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
          <div className="d-flex flex-column flex-sm-row gap-4">
            <div className="position-relative col col-sm-4 bg-body rounded-4 shadow p-4">
              <Link
                className="position-absolute me-3 end-0 btn btn-outline-blue float-end z-1"
                href="/enviados"
              >
                Voltar
              </Link>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Image className="mb-3 rounded-3" src={item.card} alt="as" />
                <p>{item.category}</p>
                <p>Mensagem: {item.message}</p>
                <p>Valor: {item.value}</p>
                <p>Data: {item.date}</p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 w-100 ">
                  <a
                    className="w-100 btn btn-blue align-self-sm-start"
                    href="?"
                  >
                    Pix
                  </a>
                  <a
                    className="w-100 btn btn-blue align-self-sm-start"
                    href="?"
                  >
                    Cartão de Crédito
                  </a>
                  <a
                    className="w-100 btn btn-blue align-self-sm-start"
                    href="?"
                  >
                    Boleto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterDash />
      </div>
    </div>
  )
}

export default SentDetail
