"use client"
import React, { useState, useEffect } from "react"
import card from "@/assets/card.png"
import Image from "next/image"

const categorys = [
  {
    id: 1,
    imgSrc: card,
    category: "Aniversário da Mãe & Mãe",
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

// Função para truncar o texto da categoria
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + ".."
  } else {
    return text
  }
}

const Body = () => {
  const [maxTextLength, setMaxTextLength] = useState(20) // Valor padrão para telas maiores
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    const handleResize = () => {
      // Atualiza o valor máximo de caracteres com base na largura da tela
      setMaxTextLength(window.innerWidth < 720 ? 30 : 20)
    }

    // Adiciona um listener para o evento de redimensionamento da janela
    window.addEventListener("resize", handleResize)

    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Executa este efeito apenas uma vez, após a montagem do componente

  // Calcula o índice inicial e final dos itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = categorys.slice(indexOfFirstItem, indexOfLastItem)

  // Função para mudar de página
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      <div className="pt-5 container-md">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {currentItems.map((categoryItem) => (
            <div className="item col pb-1" key={categoryItem.id}>
              <div className="card shadow-sm border-0 h-100 p-sm-3 p-2 rounded-sm-5 rounded-4">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="glt-blue">
                    {truncateText(categoryItem.category, maxTextLength)}
                  </span>
                  <span className="btn gl-blue text-light h-6 rounded-3">
                    {categoryItem.cards}
                  </span>
                </div>
                <Image
                  src={categoryItem.imgSrc}
                  className="card-img-top img-fluid rounded-sm-4 rounded-3"
                  alt={`Card ${categoryItem.id}`}
                />
                <div className="card-body pb-0 pt-3 px-0">
                  <a
                    href={`/details/${categoryItem.id}`}
                    className="btn btn-outline-blue w-100 rounded-sm-4 rounded-3"
                    rel="nofollow"
                  >
                    Ver mais
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Paginação */}
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array(Math.ceil(categorys.length / itemsPerPage))
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
  )
}

export default Body
