"use client"
import React from "react"

function ComoEnviar() {
  return (
    <div className="row justify-content-center pt-5 gl-light-gray rounded-5">
      <h1 className="h3 gl-gray text-center">
        Veja com é fácil enviar o gift&love
      </h1>

      <div className=" d-flex flex-column  flex-sm-row-reverse my-5">
        <div className="col d-flex justify-content-center">
        <video className="rounded-4 img-fluid" controls width="250">
            <source src='videos/videoHome.mp4' type="video/mp4" />
            {/* Mensagem alternativa para navegadores que não suportam vídeo */}
            O seu navegador não suporta a tag vídeo.
        </video>
        </div>
        <div className="col mt-2 mt-sm-0 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col gl-blue rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Navegue pelo nosso site</p>
              <p>
                Explore a nossa ampla seleção de cartões de presente e escolha o
                mais adequado para a ocasião
              </p>
            </div>
            <div className="col gl-yellow rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Personalize sua mensagem</p>
              <p>
                Preencha as informações do destinatário (nome, dia/mês de
                aniversário e número de WhatsApp).
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col gl-pink rounded-4 p-3 m-sm-3 m-2 text-center text-light ">
              <p className="fw-bold">Selecione o valor do cartão</p>
              <p>Escolha o valor do cartão de presente que deseja enviar.</p>
            </div>
            <div className="col gl-orange rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Efetue o pagamento</p>
              <p>Finalize a compra com segurança e de forma conveniente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComoEnviar
