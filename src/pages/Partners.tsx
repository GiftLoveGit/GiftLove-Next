import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"
import cardParceiros from "../assets/parceiros.png"

const cards = [
  {
    id: 1,
    imgSrc: cardParceiros,
    name: "Outlet Macapá",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 2,
    imgSrc: cardParceiros,
    name: "Única Bronzeamento Natural",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 3,
    imgSrc: cardParceiros,
    name: "Você Chic Boutique",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 4,
    imgSrc: cardParceiros,
    name: "Tourinho Inovatech",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 5,
    imgSrc: cardParceiros,
    name: "Diva Pink Presentes & Variedades",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 6,
    imgSrc: cardParceiros,
    name: "Slim-Estética Especializada",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 7,
    imgSrc: cardParceiros,
    name: "Salão de Beleza Anne Vieria",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
  {
    id: 8,
    imgSrc: cardParceiros,
    name: "Salão de Beleza LasBellas",
    adress: "Loja Virtual",
    social: "https://www.google.com",
  },
]

const Partners = () => {
  const { id } = useParams<{ id: string }>()
  const cardId = id ? parseInt(id, 10) : 0
  const card = cards.find((item) => item.id === cardId)

  useEffect(() => {
    if (card) {
      document.title = `GiftLove | ${card.name}`
    }
  }, [card])

  if (!card) {
    return <div>Categoria não encontrada</div>
  }

  return (
    <div>
      <Navbar />
      <div className="container-md">
        <div className="mt-5 pt-5">
          <div className="d-flex flex-column justify-content-center align-items-center flex-sm-row gap-3">
            <div className="">
              <img
                src={card.imgSrc}
                className="img-fluid rounded-4"
                alt={card.name}
              />
            </div>
            <div className="">
              <h2 className="fw-bold">{card.name}</h2>
              <p>Endereço: {card.adress}</p>
              <a className="btn btn-secondary" href={card.social}>
                <i className="bx bxl-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Partners
