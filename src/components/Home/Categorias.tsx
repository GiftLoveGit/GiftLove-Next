"use client"
import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"

import Image from 'next/image'
import { getDataCategories } from '@/actions/home';

// Função para truncar o texto da categoria
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + ".."
  } else {
    return text
  }
}

export default function Categorias() {
  const [maxTextLength, setMaxTextLength] = useState(20) // Valor padrão para telas maiores
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await getDataCategories();
        setCategoriesData(data.data);
      } catch (error) {
        console.error('Erro ao obter dados de categorias:', error);
      }
    };

    fetchCategoriesData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      // Atualiza o valor máximo de caracteres com base na largura da tela
      setMaxTextLength(window.innerWidth < 720 ? 8 : 20)
    }

    // Adiciona um listener para o evento de redimensionamento da janela
    window.addEventListener("resize", handleResize)

    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Executa este efeito apenas uma vez, após a montagem do componente
  const bodyItems = categoriesData.map(({ id, image, name, image_base64 }) => (
    <div className="item me-4 pb-1" key={id}>
      <div className="card shadow-sm border-0 h-100 p-sm-3 p-2 rounded-sm-5 rounded-4">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <span className="glt-blue">
            {truncateText(name, maxTextLength)}
          </span>
          {/* <span className="btn gl-blue text-light h-6 rounded-3">
            {categoryItem.cards}
          </span> */}
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE}/${image}`}
          className="card-img-top rounded-sm-4 rounded-3"
          alt={name}
          width={183}
          height={236}
          placeholder="blur"
          blurDataURL={image_base64}
        />
        <div className="card-body pb-0 pt-3 px-0">
          <a
            href="/categorias"
            className="btn btn-outline-blue w-100 rounded-sm-4 rounded-3"
            rel="nofollow"
          >
            Ver mais
          </a>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="pt-5">
      <h1 className="h3 gl-gray text-center mb-3">Veja Mais Categorias</h1>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={3000}
        autoPlay
        infinite
        items={bodyItems}
        responsive={{ 0: { items: 2 }, 568: { items: 2 }, 1024: { items: 4 } }}
        controlsStrategy="alternate"
        disableButtonsControls
      />
    </div>
  )
}