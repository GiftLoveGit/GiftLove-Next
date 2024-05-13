import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"
import card from "../assets/card.png"

interface Card {
  id: number
  imgSrc: string
  title: string
  category: string
  categoryId: number
}

const cards: Card[] = [
  {
    id: 1,
    title: "Cartão 1",
    imgSrc: card,
    category: "Aniversário da Mãe",
    categoryId: 1,
  },
  {
    id: 2,
    title: "Cartão 2",
    imgSrc: card,
    category: "Aniversário do Pai",
    categoryId: 2,
  },
  {
    id: 3,
    title: "Cartão 3",
    imgSrc: card,
    category: "Aniversário do Pai",
    categoryId: 2,
  },
  {
    id: 3,
    title: "Cartão 4",
    imgSrc: card,
    category: "Dia das Crianças",
    categoryId: 12,
  },
]

const Results = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get("search") || ""
  const [searchResults, setSearchResults] = useState<Card[]>([])

  useEffect(() => {
    // Simulando uma busca nos dados dos cartões com base no termo de pesquisa
    const results = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm])

  return (
    <div>
      <Navbar />
      <div className="container-md mt-5" style={{ minHeight: "15vh" }}>
        <h1 className="fw-bold">Resultados da Pesquisa</h1>
        <p>Exibindo resultados para: {searchTerm}</p>
        {searchResults.length === 0 ? (
          <p>Nenhum resultado encontrado.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {searchResults.map((result) => (
              <div className="col" key={result.id}>
                <div className="card shadow-sm border-0  p-sm-3 p-2 rounded-sm-5 rounded-4">
                  <img
                    src={result.imgSrc}
                    alt={result.title}
                    className="img-fluid rounded-sm-4 rounded-3"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{result.title}</h5>
                    <p className="card-text">Categoria: {result.category}</p>
                    <a
                      className="btn btn-outline-blue"
                      href={`/details/${result.categoryId}`}
                    >
                      Ver Mais
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Results
