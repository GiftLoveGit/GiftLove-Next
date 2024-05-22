import LoginIMG from "@/assets/loginimg.svg"
import Link from 'next/link'
import Image from 'next/image'
import { UserLoginForm } from "./components/user-login-auth"
import { getAuthData } from "@/actions/auth"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GiftLove | Login",
    description: "login",
};

export default async function Login() {
    const today = new Date()
    return (
        <div className="d-flex justify-content-center min-vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center p-3 p-sm-0">
                <div className="d-flex flex-column flex-sm-row shadow rounded-4">
                    <div className="col d-none d-sm-flex">
                        <Image className="img-fluid rounded-4" src={LoginIMG} alt="Login" />
                    </div>
                    <div className="col py-5 px-3 px-sm-5">
                        <div className="">
                            <h3 className="glt-blue">Seja Bem Vindo!</h3>
                            <p className="gl-gray">
                                Faça login para acessar seu painel no GiftLoves
                            </p>
                        </div>
                        <UserLoginForm />                        
                    </div>
                </div>
            </div>
            <div className="position-absolute d-none d-sm-flex bottom-0">
                <p className="text-muted text-center ">
                    © {today.getFullYear()}{" "}
                    <Link className="gl-gray" href="/">
                        GIFTLOVES
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}
