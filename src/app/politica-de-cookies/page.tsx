import { Metadata } from "next"
import Concact from "../(fale-conosco)/fale-conosco/components/concact";
import Email from "../(fale-conosco)/fale-conosco/components/Email";

export const metadata: Metadata = {
    title: "GiftLove | Politíca de Cookies",
    description: "GiftLove | Politíca de Cookies",
};

export default function Cookies() {
    return (
        <div>
            <div className="container-md">
                <div className="mt-5 pt-0 pt-sm-3 gl-gray">
                    <h3>Politíca de Cookies</h3>
                    <small>Última atualização: 30/04/2024</small>
                    <p>
                        <b>1. O que são cookies?</b>
                    </p>
                    <p>
                        Cookies são pequenos arquivos de texto que um site armazena no seu
                        dispositivo quando você o visita. Eles são amplamente utilizados
                        para fazer com que os sites funcionem de maneira mais eficiente,
                        além de fornecer informações aos proprietários do site.
                    </p>
                    <p>
                        <b>2. Como usamos cookies</b>
                    </p>
                    <p>
                        Nós utilizamos cookies para melhorar a sua experiência de navegação
                        em nosso site de cartões de presentes virtuais. Os cookies nos
                        ajudam a lembrar de suas preferências, facilitando o uso do site e
                        permitindo que você navegue de forma mais eficiente.
                    </p>
                    <p>
                        <b>3. Tipos de cookies que utilizamos</b>
                    </p>
                    <p>
                        Esses cookies são necessários para que o site funcione corretamente.
                        Eles incluem, por exemplo, cookies que permitem que você faça login
                        em áreas seguras do nosso site e utilize carrinho de compras.
                    </p>
                    <ul>
                        <ol>
                            <p>3.1. Cookies Essenciais</p>
                            <p>
                                Esses cookies são necessários para que o site funcione
                                corretamente. Eles incluem, por exemplo, cookies que permitem
                                que você faça login em áreas seguras do nosso site e utilize
                                carrinho de compras.
                            </p>
                        </ol>
                        <ol>
                            <p>3.2. Cookies de Desempenho</p>
                            <p>
                                Esses cookies nos ajudam a entender como os visitantes interagem
                                com o nosso site, coletando informações anonimamente. Isso nos
                                permite melhorar continuamente o desempenho do site e oferecer
                                um melhor serviço.
                            </p>
                        </ol>
                        <ol>
                            <p>3.3. Cookies de Funcionalidade</p>
                            <p>
                                Esses cookies permitem que o site se lembre das escolhas que
                                você faz (como seu nome de usuário, idioma ou região) e ofereça
                                recursos aprimorados e mais personalizados.
                            </p>
                        </ol>
                        <ol>
                            <p>3.4. Cookies de Publicidade</p>
                            <p>
                                Nós trabalhamos com parceiros de publicidade para exibir
                                anúncios que sejam relevantes para você. Esses cookies ajudam a
                                personalizar os anúncios que você vê, garantindo que sejam mais
                                úteis e interessantes.
                            </p>
                        </ol>
                    </ul>
                    <p>
                        <b>4. Gerenciando cookies</b>
                    </p>
                    <p>
                        Você pode controlar e/ou excluir cookies a qualquer momento. Você
                        pode ajustar as configurações do seu navegador para recusar cookies
                        ou alertá-lo quando eles estiverem sendo enviados. No entanto, tenha
                        em mente que algumas partes do nosso site podem não funcionar
                        corretamente se você desativar os cookies.
                    </p>
                    <p>
                        <b>5. Alterações nesta política</b>
                    </p>
                    <p>
                        Podemos atualizar nossa Política de Cookies de tempos em tempos.
                        Quaisquer alterações entrarão em vigor imediatamente após a
                        publicação da versão revisada em nosso site.
                    </p>
                    <p>
                        <b>6. Contato</b>
                    </p>
                    <p>
                        Se você tiver alguma dúvida sobre nossa Política de Cookies, entre
                        em contato conosco pelo telefone: <Concact /> ou envie um e-mail
                        para: <Email />
                    </p>
                </div>
            </div>
        </div>
    )
}
