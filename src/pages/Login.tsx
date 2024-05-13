import React, { useEffect } from "react"
import LoginIMG from "../assets/loginimg.svg"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Login`
  }, [])

  const today = new Date()
  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center p-3 p-sm-0">
        <div className="d-flex flex-column flex-sm-row shadow rounded-4">
          <div className="col d-none d-sm-flex">
            <img className="img-fluid rounded-4" src={LoginIMG} alt="Login" />
          </div>
          <div className="col py-5 px-3 px-sm-5">
            <div className="">
              <h3 className="glt-blue">Seja Bem Vindo!</h3>
              <p className="gl-gray">
                Faça login para acessar seu painel no GiftLoves
              </p>
            </div>
            <form action="" className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="cpfFormControlInput1"
                  className=" gl-gray form-label"
                >
                  CPF
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cpfFormControlInput1"
                  placeholder="Digite seu CPF"
                />
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label
                    htmlFor="senhaFormControlInput1"
                    className=" gl-gray form-label"
                  >
                    Senha
                  </label>

                  <span className="text-end">
                    <a href="?" className="gl-gray">
                      Esqueceu sua senha?
                    </a>
                  </span>
                </div>

                <input
                  type="password"
                  className="form-control"
                  id="senhaFormControlInput1"
                  placeholder="Digite sua Senha"
                />
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
                  Manter conectado
                </label>
              </div>

              <div className="mt-4 d-flex gap-3 w-100">
                <Link className="w-100 btn btn-yellow" to="/cadastro">
                  Cadastre-se
                </Link>
                <button type="submit" className="w-100 btn btn-blue">
                  Entrar
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

export default Login
