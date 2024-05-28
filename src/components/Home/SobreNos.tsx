"use client"
import React, { useEffect, useState } from "react"
import AliceCarousel from "react-alice-carousel"
import videodep from "@/assets/vid_placeholder.png"
import Image from 'next/image'

const cards = [
  {
    id: 1,
    imgSrc: videodep,
    buttonLink: "#",
  },
  {
    id: 2,
    imgSrc: videodep,
    buttonLink: "#",
  },
  {
    id: 3,
    imgSrc: videodep,
    buttonLink: "#",
  },
  {
    id: 4,
    imgSrc: videodep,
    buttonLink: "#",
  },
  {
    id: 5,
    imgSrc: videodep,
    buttonLink: "#",
  },
]

const bodyItems = cards.map((card) => (
  <div className="item mx-2 mx-sm-5 pb-1" key={card.id}>
    <div className="card shadow-sm border-0 h-100 rounded-sm-5 rounded-4">
      <Image
        src={card.imgSrc}
        className="card-img-top rounded-sm-4 rounded-3"
        alt={`card ${card.id} aqui`}
        width={250}
        height={250}
      />
    </div>
  </div>
));

function SobreNos() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="row justify-content-center pt-5 gl-light-gray rounded-5 p-4">
      <div className=" d-flex flex-column flex-sm-row px-sm-5 px-0 my-3">
        <div className="col d-flex justify-content-center">
          <video className="rounded-4 img-fluid" controls width="250">
            <source src="videos/apresentacao.mp4" type="video/mp4" />
            {/* Mensagem alternativa para navegadores que não suportam vídeo */}
            O seu navegador não suporta a tag vídeo.
          </video>
        </div>
        <div className="col mt-4 mt-sm-0 d-flex flex-column justify-content-center">
          <h1 className="h3 fw-bold">
            Seja bem-vindo à maior plataforma de presentes do Brasil.
          </h1>
          <p className="glp-gray">
            Chegamos para revolucionar sua forma de comprar presentes. Nós somos
            apaixonados pela vida e queremos ajudar você a expressar seu amor
            pelas pessoas que você ama ou admira da melhor forma possível.Nosso
            objetivo é oferecer aos clientes um ambiente virtual seguro,
            tornando a compra de presentes, uma experiência única e
            inesquecível.Fundada pelos sócios Máxima Maia, João Novare, Yam
            Gomes, Lorran Telles e Sanny Souza, a Gift&Love nasceu em Macapá-AP
            com o intuito de atender todo o Brasil. Aqui você encontrará um
            universo de possibilidades para presentear.Venha explorar todas as
            possibilidades que disponibilizamos em nossa plataforma de cartões
            de presentes online e descubra novas formas de expressar seu amor
            pelas pessoas que você ama ou admira. Divirta-se!
          </p>
          <div className="row mt-3">
            <div className="col d-flex flex-column align-items-sm-start align-items-center">
              <div className="text-center">
                <p className="m-0 fw-bold h3">26</p>
                <span>Categorias</span>
              </div>
            </div>
            <div className="col d-flex flex-column align-items-sm-start align-items-center  ">
              <div className="text-center">
                <p className="m-0 fw-bold h3">260</p>
                <span>Cartões</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="h3 gl-gray text-center">
          Depoimentos de Nossos Clientes
        </h1>
        <div className="mt-3">
          <AliceCarousel
            mouseTracking
            autoPlayInterval={3000}
            autoPlay
            infinite
            items={bodyItems}
            responsive={{
              0: { items: 2 },
              568: { items: 2 },
              1024: { items: 3 },
            }}
            controlsStrategy="alternate"
            disableButtonsControls
          />
        </div>
      </div>
    </div>
  )
}

export default SobreNos
