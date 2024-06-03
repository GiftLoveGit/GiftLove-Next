import logo from "@/assets/logo.png"
import Image from 'next/image'
import Link from "next/link"
import { FaInstagram, FaFacebook } from "react-icons/fa6"

export default function Footer() {
  return (
    <div className="mt-5 pt-5">
      <section className="deneb_cta">
        <div className="container">
          <div className="cta_wrapper">
            <div className="row align-items-center">
              <div className="col">
                <div className="cta_content">
                  <h3>
                    A gift&love surgiu para facilitar a sua forma de comprar e
                    enviar presentes para as pessoas que você ama ou admira.
                  </h3>
                  <p>
                    Venha fazer parte da comunidade gift&love e envie seus
                    presentes descomplicados
                  </p>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="button_box">
                  <Link href="/cadastro" className="btn btn-pink">
                    Começar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="deneb_footer">
        <div className="widget_wrapper">
          <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between ">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="widget widegt_about">
                  <div className="widget_title">
                    <Image src={logo} className="img-fluid" alt="" height="40" />
                  </div>
                  <p className="text-light">Venha fazer parte da gift&love</p>
                  <ul className="social">
                    <li>
                      <Link href="https://www.instagram.com/giftloveap" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.facebook.com/giftloves.oficial" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row">
                <div className="col">
                  <div className="widget widget_link">
                    <div className="widget_title text-light">
                      <h4>Institucional</h4>
                    </div>
                    <ul>
                      <li>
                        <Link href="/#inicio">Inicio</Link>
                      </li>
                      <li>
                        <Link href="/#sobre-nos">Sobre Nós</Link>
                      </li>
                      <li>
                        <Link href="/#destaques">Destaques</Link>
                      </li>
                      <li>
                        <Link href="/#categorias">Categorias</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="widget widget_link">
                    <div className="widget_title text-light">
                      <h4>Termos</h4>
                    </div>
                    <ul>
                      <li>
                        <Link href="/politica-de-privacidade">
                          Politica de Privacidade
                        </Link>
                      </li>
                      <li>
                        <Link href="/termos-de-uso">Termo de Uso</Link>
                      </li>
                      <li>
                        <Link href="/termos-de-troca">Termo de Troca</Link>
                      </li>
                      <li>
                        <Link href="/politica-de-cookies">Politica de Cookies</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="widget widget_link">
                    <div className="widget_title text-light">
                      <h4>Suporte</h4>
                    </div>
                    <ul>
                      <li>
                        <Link href="/perguntas-frequentes">Perguntas Frequentes</Link>
                      </li>
                      <li>
                        <Link href="/#como-enviar">
                          Como Comprar e Enviar um Gift Loves
                        </Link>
                      </li>
                      <li>
                        <Link href="/fale-conosco">Fale Conosco</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}