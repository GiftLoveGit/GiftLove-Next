import React from "react"
import Carousel from "../Home/Carousel"
import CardCarousel from "../Home/CardCarousel"
import Vantagens from "../Home/Vantagens"
import Categorias from "../Home/Categorias"
import ComoEnviar from "../Home/ComoEnviar"
import Parceiros from "../Home/Parceiros"
import SejaParceiro from "../Home/SejaParceiro"
import SobreNos from "../Home/SobreNos"
import FAQ from "../Home/FAQ"

function Body() {
  return (
    <div id="inicio" className="container-md">
      <div className="mt-2 mt-sm-5 vh-25">
        <Carousel />
      </div>
      <div id="destaques" className="mt-5">
        <CardCarousel />
      </div>
      <div className="mt-5">
        <Vantagens />
      </div>
      <div id="categorias" className="mt-5">
        <Categorias />
      </div>
      <div id="como-enviar" className="mt-5">
        <ComoEnviar />
      </div>
      <div id="parceiros" className="mt-5">
        <Parceiros />
      </div>
      <div className="mt-5">
        <SejaParceiro />
      </div>
      <div id="sobre-nos" className="mt-5">
        <SobreNos />
      </div>
      <div id="duvidas" className="mt-5">
        <FAQ />
      </div>
    </div>
  )
}

export default Body
