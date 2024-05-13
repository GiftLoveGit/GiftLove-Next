import { Metadata } from "next"
import Concact from "../(fale-conosco)/fale-conosco/components/concact";
import Email from "../(fale-conosco)/fale-conosco/components/Email";

export const metadata: Metadata = {
    title: "GiftLove | Perguntas Frequentes",
    description: "GiftLove | Perguntas Frequentes",
};

export default function FAQ() {
    return (
        <div>
            <div className="container-md">
                <div className="mt-5 pt-0 pt-sm-3 gl-gray">
                    <h3 className="text-center pb-5">Perguntas Frequentes</h3>
                    <p>
                        <b>1. Como funciona o cartão de presente virtual?</b>
                    </p>
                    <p>
                        O cartão de presente virtual é um crédito pré-pago que você adquire
                        no site da Gift Love. O valor do presente é enviado por mensagem via
                        whatsApp para o presenteado, que pode fazer a troca pelo presente
                        que desejar em qualquer loja parceira da Gift Love, usando um código
                        exclusivo.
                    </p>
                    <p>
                        <b>2. Quais são as vantagens de um cartão de presente virtual?</b>
                    </p>
                    <p>
                        Os cartões de presente virtuais oferecem conveniência, pois podem
                        ser enviados instantaneamente para o destinatário. Além disso,
                        permitem que o destinatário escolha seus próprios presentes,
                        tornando a surpresa uma experiência única e agradável.
                    </p>
                    <p>
                        <b>3. Como posso comprar um cartão de presente virtual?</b>
                    </p>
                    <p>
                        Comprar um cartão de presente virtual é simples. Ao acessar o site,
                        preencha as informações do destinatário (Nome, nascimento/dia/mês,
                        WhatsApp, valor do cartão de presente e a mensagem a ser enviada),
                        em seguida, faça o seu cadastro informando os seguintes dados
                        pessoais (nome, CPF, telefone, e-mail e senha), após o cadastro você
                        será direcionado para a tela de pagamento onde poderá escolher a
                        opção mais conveniente para você, e pronto! O cartão será enviado
                        por mensagem via whatsApp para o destinatário após a confirmação do
                        pagamento.
                    </p>
                    <p>
                        <b>4. Posso escolher a mensagem do cartão de presente virtual?</b>
                    </p>
                    <p>
                        Sim, durante o processo de compra você terá a opção de escolher
                        entre os temas disponíveis no site o cartão que mais combina com o
                        destinatário.
                    </p>
                    <p>
                        <b>5. Os cartões de presente virtuais têm validade?</b>
                    </p>
                    <p>
                        O cartão de presente virtual Gift Love poderá ser trocado a qualquer
                        tempo e terá validade de 01 (um) ano. Após o período de 01 (um) ano,
                        o valor do cartão de presente virtual restará vencido e não poderá
                        mais ser resgatado pelo presenteador e nem trocado pelo presenteado.
                    </p>
                    <p>
                        <b>6. Posso usar um cartão de presente virtual várias vezes?</b>
                    </p>
                    <p>
                        Sim, você pode usar um cartão de presente virtual várias vezes até
                        que o saldo seja totalmente utilizado.
                    </p>
                    <p>
                        <b>7. Posso devolver ou trocar um cartão de presente virtual?</b>
                    </p>
                    <p>
                        Infelizmente, não aceitamos devoluções ou trocas de cartões de
                        presente, pois eles são considerados produtos não reembolsáveis. Por
                        isso, certifique-se de escolher o valor e o destinatário
                        corretamente antes de fazer a compra.
                    </p>
                    <p>
                        <b>
                            8. É seguro comprar um cartão de presente virtual em seu site?
                        </b>
                    </p>
                    <p>
                        Sim, oferecemos um ambiente virtual seguro para todas as transações.
                        Utilizamos tecnologia de criptografia avançada para proteger suas
                        informações pessoais e detalhes de pagamento.
                    </p>
                    <p>
                        <b>
                            9. Posso agendar o envio de um cartão de presente virtual para uma
                            data específica?
                        </b>
                    </p>
                    <p>
                        Sim, você pode agendar o envio de um cartão de presente virtual para
                        uma data específica durante o processo de compra. Basta selecionar a
                        data desejada.
                    </p>
                    <p>
                        <b>
                            10. Posso reenviar o código do cartão de presente virtual caso o
                            destinatário o perca?
                        </b>
                    </p>
                    <p>
                        Sim, se o destinatário perder o código do cartão de presente
                        virtual, entre em contato conosco e teremos prazer em reenviar o
                        código para você.
                    </p>
                    <p>
                        <b>
                            11. É possível obter um reembolso em dinheiro pelo saldo não
                            utilizado de um cartão de presente virtual?
                        </b>
                    </p>
                    <p>
                        Não, o saldo não utilizado de um cartão de presente virtual não pode
                        ser reembolsado em dinheiro. Ele só pode ser usado para compras nas
                        lojas parceiras.
                    </p>
                    <p>
                        <b>
                            12. Posso transferir o saldo de um cartão de presente virtual para
                            outra pessoa?
                        </b>
                    </p>
                    <p>
                        Não, o saldo de um cartão de presente virtual não pode ser
                        transferido para outra pessoa. Ele só pode ser usado pelo
                        destinatário original.
                    </p>
                    <p>
                        <b>13. Posso cancelar a compra de um cartão de presente virtual?</b>
                    </p>
                    <p>
                        Infelizmente, não aceitamos cancelamentos de compras de cartões de
                        presente virtuais. Certifique-se de revisar todas as informações
                        antes de concluir a compra.
                    </p>
                    <p>
                        <b>
                            14. Como posso verificar o saldo de um cartão de presente virtual?
                        </b>
                    </p>
                    <p>
                        Você pode verificar o saldo do seu cartão de presente virtual em
                        nosso site, após se cadastrar e criar sua conta em nossa plataforma,
                        insira o código exclusivo do cartão recebido para ter acesso ao
                        valor disponível.
                    </p>
                    <p>
                        <b>
                            15. É possível que o destinatário escolha um presente com valor
                            superior ao cartão de presente?
                        </b>
                    </p>
                    <p>
                        Sim, porém o presenteado terá que pagar a diferença do valor
                        excedente diretamente na loja em que estiver efetuando a compra.
                    </p>
                    <p>
                        <b>
                            16. Tenho mais dúvidas. Como posso entrar em contato com o suporte
                            ao cliente?
                        </b>
                    </p>
                    <p>
                        Para entrar em contato com o suporte ao cliente, você poderá ligar
                        para <Concact/> ou enviar um e-mail para:
                        <Email />. Teremos prazer em ajudá-lo com suas
                        dúvidas.
                    </p>
                </div>
            </div>
        </div>
    )
}
