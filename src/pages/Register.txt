import React, { useEffect } from "react"
import RegisterIMG from "../assets/registerimg.svg"
import { Link } from "react-router-dom"
import InputMask from "react-input-mask"

const Register: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Cadastro`
  }, [])

  const today = new Date()
  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center p-3 p-sm-0">
        <div className="d-flex flex-sm-row-reverse flex-column shadow rounded-4">
          <div className="col d-none d-sm-flex">
            <img
              className="img-fluid h-100 rounded-4"
              style={{ objectFit: "cover" }}
              src={RegisterIMG}
              alt="Register"
            />
          </div>
          <div className="col-sm-8 col py-5 px-3 px-sm-5">
            <div className="">
              <h3 className="glt-pink">Seja Bem Vindo!</h3>
              <p className="gl-gray">
                Faça cadastro para acessar seu painel no GiftLoves
              </p>
            </div>
            <form action="" className="mt-4">
              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                  <label htmlFor="inputName" className="form-label gl-gray">
                    Nome Completo
                  </label>
                  <input type="text" className="form-control" id="inputName" />
                </div>
                <div className="col">
                  <label htmlFor="inputCPF" className="form-label gl-gray">
                    CPF
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputCPF"
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                  <label
                    htmlFor="inputNumber"
                    className="form-label gl-gray"
                    data-mask="(00) 0000-0000"
                  >
                    Telefone/Whatsapp
                  </label>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar="_"
                    className="form-control"
                    id="inputNumber"
                    placeholder="(__) _____-____"
                  />
                </div>
                <div className="col">
                  <label htmlFor="inputDate" className="form-label gl-gray">
                    Nascimento
                  </label>
                  <input type="date" className="form-control" id="inputDate" />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <div className="col">
                  <label htmlFor="InputEmail" className="form-label gl-gray">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="InputEmail"
                  />
                </div>
                <div className="col">
                  <label htmlFor="inputPassword" className="form-label gl-gray">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label gl-gray "
                  htmlFor="flexCheckDefault"
                >
                  Li e concordo com os{" "}
                  <a href="/termos-de-uso" target="_blank">
                    termos de uso
                  </a>{" "}
                  e{" "}
                  <a href="/politica-de-privacidade" target="_blank">
                    política de privacidade
                  </a>
                  .
                </label>
              </div>

              <div className="mt-4 d-flex gap-3 w-100">
                <Link className="w-100 btn btn-blue" to="/login">
                  Fazer Login
                </Link>
                <button type="submit" className="w-100 btn btn-yellow">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="position-absolute d-none d-sm-flex bottom-0">
        <p className="text-muted text-center ">
          © {today.getFullYear()}{" "}
          <a className="gl-gray" href="/">
            GIFTLOVES
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default Register
