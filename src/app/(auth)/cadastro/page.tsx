import { Metadata } from "next";
import RegisterIMG from "@/assets/registerimg.svg"
import Link from 'next/link'
import Image from "next/image"
import { UserRegisterForm } from "./components/user-register-auth";

export const metadata: Metadata = {
    title: "Cadastro de usuário",
    description: "Realize seu cadastro na GIFT LOVE!",
  };

export default async function Register () {

  const today = new Date()
  return (
    <div className="d-flex justify-content-center min-vh-100">
      <div className="d-flex flex-column justify-content-center align-items-center p-3 p-sm-0">
        <div className="d-flex flex-sm-row-reverse flex-column shadow rounded-4">
          <div className="col d-none d-sm-flex">
            <Image
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
            <UserRegisterForm />
          </div>
        </div>
      </div>
      <div className="position-absolute d-none d-sm-flex bottom-0">
          <Link className="gl-gray" href="/">
        <p className="text-muted text-center ">
          © {today.getFullYear()}{" "}
            GIFTLOVES
          .
        </p>
          </Link>
      </div>
    </div>
  )
}

