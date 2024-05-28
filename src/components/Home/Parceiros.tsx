'use client'
import React from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import cardParceiros from "@/assets/parceiros.png"
import Image from "next/image"
import Link from "next/link"

const cards = [
  {
    id: 1,
    imgSrc: cardParceiros,
    name: "Outlet Macapá",
    adress: "Loja Virtual",
  },
  {
    id: 2,
    imgSrc: cardParceiros,
    name: "Única Bronzeamento Natural",
    adress: "Loja Virtual",
  },
  {
    id: 3,
    imgSrc: cardParceiros,
    name: "Você Chic Boutique",
    adress: "Loja Virtual",
  },
]

const bodyItems = cards.map((card) => (
  <div className="item me-4 pb-1" key={card.id}>
    <div className="card shadow-sm border-0 h-100 p-sm-3 p-2 rounded-sm-5 rounded-4">
      <Image
        src={card.imgSrc}
        className="card-img-top rounded-sm-4 rounded-3"
        alt={`Card ${card.id}`}
        width={250}
        height={250}
      />
      <div className="card-body pb-0 pt-3 px-0">
        <Link
          href={`/parceiro/${card.id}`}
          className="btn btn-outline-pink w-100 rounded-sm-4 rounded-3"
          rel="nofollow"
        >
          Saber mais
        </Link>
      </div>
    </div>
  </div>
))

const Parceiros = () => (
  <div className="pt-5">
    <h1 className="h3 gl-gray text-center mb-3">Nossos Parceiros</h1>

    <AliceCarousel
      mouseTracking
      autoPlayInterval={3000}
      autoPlay
      infinite
      items={bodyItems}
      responsive={{ 0: { items: 2 }, 568: { items: 2 }, 1024: { items: 5 } }}
      controlsStrategy="alternate"
      disableButtonsControls
    />
  </div>
)

export default Parceiros
