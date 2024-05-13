import { Metadata } from "next"
import Concact from "../(fale-conosco)/fale-conosco/components/concact";
import Email from "../(fale-conosco)/fale-conosco/components/Email";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GiftLove | Termos de Uso",
    description: "GiftLove | Termos de Uso",
};

export default function TermsOfUse() {
    return (
        <div>
            <div className="container-md">
                <div className="mt-5 pt-0 pt-sm-3 gl-gray">
                    <h3>Termos de Uso</h3>
                    <p>
                        Este Termo de Uso estabelece os termos e condições para o uso do
                        site de cartão de presente virtual giftloves.com.br, operado por
                        GIFT LOVE com sede em AL Comercial (Lot. Parque Irmãos Platon), n.
                        124. Conjunto Cabralzinho, CEP 68.906-838, contato <Concact /> ou enviar um e-mail para: <Email />,
                        Macapá-AP, doravante referido como &quot;Empresa&quot;.
                    </p>
                    <p>
                        <b>1. Aceitação dos Termos</b>
                    </p>
                    <p>
                        Ao acessar e utilizar o Site, você concorda em cumprir os termos e
                        condições estabelecidos neste Termo. Por isso, leia os Termos de Uso
                        com bastante atenção antes de começar a usar nossos serviços. Se
                        você não concordar com esses termos, não utilize o Site, pois ao
                        usar o site, abrir uma conta ou mesmo aceitar os termos de uso
                        através de um click, você aceita e concorda em cumprir nosso termo
                        de serviços. Ao aceitar nossos termos, você reconhece que está
                        ciente das nossas políticas de privacidade, encontradas{" "}
                        <a href="/politica-de-privacidade">aqui</a>.
                    </p>
                    <p>
                        <b>2. Uso do Site</b>
                    </p>
                    <p>
                        O Site destina-se a venda de cartões de presente online, que poderão
                        ser trocados em qualquer das lojas conveniadas à nossa empresa. Ao
                        acessar o site e aceitar nossos termos e condições, você concorda em
                        usar o site apenas para fins legais e de acordo com todas as leis e
                        regulamentações aplicáveis.
                    </p>
                    <p>
                        Disponibilizamos uma equipe de suporte em horário comercial
                        compreendido entre 08:00 às 18:00 horas, de segunda a sábado. Caso
                        tenha dúvidas sobre o site ou dos termos de uso, contacte nossa
                        equipe de suporte ao cliente através de nossos canais de atendimento
                        disponibilizados no rodapé do site ou envie uma solicitação{" "}
                        <Link className="text-info" target="_blank" rel="noopener noreferrer" href="https://wa.me/5547988439543?text=Ol%C3%A1%2C+tudo+bem%21%3F">aqui</Link>.
                    </p>

                    <p>
                        <b>3. Conta do Usuário</b>
                    </p>
                    <p>
                        Para acessar certos recursos do Site, você pode precisar criar uma
                        conta de usuário. Você é responsável por manter a confidencialidade
                        das informações da sua conta, das informações das pessoas
                        presenteadas e por todas as atividades que ocorram sob sua conta.
                    </p>
                    <p>
                        <b>4. Propriedade Intelectual</b>
                    </p>
                    <p>
                        Todo o conteúdo presente no Site, incluindo textos, imagens,
                        logotipos, gráficos e outros materiais, são protegidos por direitos
                        autorais e outros direitos de propriedade intelectual pertencentes à
                        Empresa ou a terceiros autorizados.
                    </p>
                    <p>
                        <b>5. Compras</b>
                    </p>
                    <p>
                        Ao efetuar compras através do Site, você concorda em cumprir as
                        políticas de pagamento e troca estabelecidas pela Empresa
                    </p>
                    <p>
                        <b>6. Limitação de Responsabilidade</b>
                    </p>
                    <p>
                        A Empresa não se responsabiliza por quaisquer danos, indiretos,
                        incidentais, consequenciais ou especiais resultantes do uso
                        incorreto de nosso site.
                    </p>
                    <p>
                        <b>7. Alterações no Termo de Uso</b>
                    </p>
                    <p>
                        A Empresa se reserva o direito de modificar ou atualizar este Termo
                        a qualquer momento, mediante aviso prévio no Site. O uso contínuo do
                        Site após tais modificações constitui sua aceitação dos termos
                        revisados.
                    </p>
                    <p>
                        <b>8. Lei Aplicável</b>
                    </p>
                    <p>
                        Este Termo será regido e interpretado de acordo com as leis do
                        Brasil.
                    </p>
                    <p>
                        <b>9. Contato</b>
                    </p>
                    <p>
                        Se você tiver alguma dúvida ou preocupação sobre este Termo ou o
                        Site, entre em contato conosco pelo telefone <Concact /> ou
                        envia um e-mail para: <Email />, que estaremos
                        sempre à disposição para quaisquer dúvidas ou soluções.
                    </p>
                </div>
            </div>
        </div>
    )
}
