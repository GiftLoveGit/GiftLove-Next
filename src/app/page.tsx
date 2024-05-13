import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/components/Home/Carousel";
import CardCarousel from "@/components/Home/CardCarousel";
import Vantagens from "@/components/Home/Vantagens";
import Categorias from "@/components/Home/Categorias";
import ComoEnviar from "@/components/Home/ComoEnviar";
import Parceiros from "@/components/Home/Parceiros";
import SejaParceiro from "@/components/Home/SejaParceiro";
import SobreNos from "@/components/Home/SobreNos";
import FAQ from "@/components/Home/FAQ";
import Navbar from "@/partials/Navbar";
import Footer from "@/partials/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
