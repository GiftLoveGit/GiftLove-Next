import React from "react"
import letter from "@/assets/sejaparceiro.png"
import banner from "@/assets/camada1.png"
import icon1 from "@/assets/vendas.png"
import icon2 from "@/assets/clientes.png"
import icon3 from "@/assets/financeiro.png"
import Image from 'next/image'

export default function SejaParceiro() {
  return (
    <div className="position-relative">
      <div className="rounded-4  glp-yellow">
        <div className="row align-items-end">
          <div className="col-sm-6 col-12 p-sm-5 p-4 z-2">
            <div className="d-flex flex-column  mb-5 ">
              <Image className="letter" src={letter} alt="Letter" />
              <div className="d-flex flex-sm-row flex-column text-light text-center gap-4 mt-4">
                <div className="col">
                  <Image src={icon1} alt="Aumente suas Vendas" width={109} height={109}/>
                  <p>Aumente suas Vendas</p>
                </div>
                <div className="col">
                  <Image src={icon2} alt="Conquiste mais clientes" width={109} height={109}/>
                  <p>Conquiste mais clientes</p>
                </div>
                <div className="col">
                  <Image src={icon3} alt="Agende seus recebimentos"  width={109} height={109}/>
                  <p>Agende seus recebimentos</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <a href="/seja-parceiro" className=" btn btn-blue">
                  Quero ser parceiro!
                </a>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-end z-1 position-relative figure">
            <Image
              className="img-fluid mt-3 position-relative"
              src={banner}
              alt="Letter"
              style={{ width: "80%", right: "-30px" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
