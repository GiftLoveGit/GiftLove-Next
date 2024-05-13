import React from "react"
import video from "@/assets/vantagens.mp4"

function Vantagens() {
  return (
    <div className="row justify-content-center pt-5 gl-light-gray rounded-5">
      <h1 className="h3 gl-gray text-center">
        Vantagens de presentar com o gift&love
      </h1>

      <div className=" d-flex flex-column flex-sm-row my-5">
        <div className="col d-flex justify-content-center">
          <video className="rounded-4 img-fluid" controls width="450">
            <source src="../../assets/vantagens.mp4" type="video/mp4" />
            {/* Mensagem alternativa para navegadores que não suportam vídeo */}
            O seu navegador não suporta a tag vídeo.
          </video>
        </div>
        <div className="col mt-2 mt-sm-0 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col gl-orange rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Praticidade</p>
              <p>
                Presenteie de qualquer lugar e a qualquer hora sem precisar sair
                de casa ou do trabalho.
              </p>
            </div>
            <div className="col gl-pink rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Compra online</p>
              <p>
                Você envia o presente pelo celular, de onde estiver, sem perder
                tempo procurando o presente ideal.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col gl-yellow rounded-4 p-3 m-sm-3 m-2 text-center text-light ">
              <p className="fw-bold">Sustentabilidade</p>
              <p>Presenteie sem gastar combustível ou gerar lixo.</p>
            </div>
            <div className="col gl-blue rounded-4 p-3 m-sm-3 m-2 text-center text-light">
              <p className="fw-bold">Liberdade de escolha</p>
              <p>
                O presenteado escolhe o que mais gosta, na loja que preferir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vantagens
