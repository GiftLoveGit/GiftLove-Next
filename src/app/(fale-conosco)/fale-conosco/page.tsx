import { Metadata } from "next"
import Concact from "./components/concact";
import Email from "./components/Email";


export const metadata: Metadata = {
    title: "GiftLove | Fale Conosco",
    description: "GiftLove | Fale Conosco",
};
export default function Contact() {
    return (
        <div>
            {/* <Navbar /> */}
            <div className="container-md" style={{ minHeight: "20vh" }}>
                <div className="mt-5 pt-0 pt-sm-3 gl-gray">
                    <h3>Fale Conosco</h3>
                    <p>
                        Em caso de dúvidas fale com a gente de segunda à sábado, das 09:00
                        às 18:00h através de nosso telefone <Concact /> ou envie um
                        e-mail para: <Email />
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

// export default Contact
