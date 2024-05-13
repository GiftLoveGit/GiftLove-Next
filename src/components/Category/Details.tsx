import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import card from "../../assets/card.png"
import Navbar from "../../partials/Navbar"
import Footer from "../../partials/Footer"

const categorys = [
  {
    id: 1,
    imgSrc: card,
    category: "Aniversário da Mãe",
    cards: 12,
  },
  {
    id: 2,
    imgSrc: card,
    category: "Aniversário do Pai",
    cards: 32,
  },
  {
    id: 3,
    imgSrc: card,
    category: "Aniversário da Filha",
    cards: 45,
  },
  {
    id: 4,
    imgSrc: card,
    category: "Colaborador/Funcionario",
    cards: 24,
  },
  {
    id: 5,
    imgSrc: card,
    category: "Mensagens de Natal",
    cards: 12,
  },
  {
    id: 6,
    imgSrc: card,
    category: "Aniversário de Casamento- Esposa",
    cards: 12,
  },
  {
    id: 7,
    imgSrc: card,
    category: "Dia das Crianças",
    cards: 12,
  },
  {
    id: 8,
    imgSrc: card,
    category: "Aniversário da Prima",
    cards: 12,
  },
  {
    id: 9,
    imgSrc: card,
    category: "Mensagens de Réveillon",
    cards: 12,
  },
]

const Details = () => {
  const { id } = useParams<{ id: string }>()
  const categoryId = id ? parseInt(id, 10) : 0
  const category = categorys.find((item) => item.id === categoryId)

  useEffect(() => {
    if (category) {
      document.title = `GiftLove | ${category.category}`
    }
  }, [category])

  // Estados para controle da página atual e itens por página
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  if (!category) {
    return <div>Categoria não encontrada</div>
  }

  // Cria um array com o número de cartões que corresponde à quantidade na categoria
  const cardsArray = Array.from(Array(category.cards).keys())

  // Calcular o índice inicial e final dos itens a serem exibidos
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, cardsArray.length)
  const currentItems = cardsArray.slice(startIndex, endIndex)

  // Função para mudar de página
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      <Navbar />
      <div className="container-md">
        <div className="mt-5 pt-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <h1 className="fw-bold">{category.category}</h1>
              <p>Total de Cartões: {category.cards}</p>
            </div>
            <a href="/categorias" className="btn btn-outline-blue">
              Voltar
            </a>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {currentItems.map((index) => (
              <div className="item col pb-1" key={index}>
                <div className="card shadow-sm border-0 h-100 p-sm-3 p-2 rounded-sm-5 rounded-4">
                  <img
                    src={card}
                    className="card-img-top rounded-sm-4 rounded-3"
                    alt={`Card ${index}`}
                  />
                  <div className="card-body pb-0 pt-3 px-0">
                    <a
                      href={`/cartao/${index + 1}`}
                      className="btn btn-outline-yellow w-100 rounded-sm-4 rounded-3"
                      rel="nofollow"
                    >
                      Quero Esse
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Paginação */}
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array(Math.ceil(cardsArray.length / itemsPerPage))
                  .fill(0)
                  .map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Details
