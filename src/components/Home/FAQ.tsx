import React from "react"

const accordion = [
  {
    id: 1,
    title: "Como funciona o cartão de presente virtual?",
    text: "O cartão de presente virtual é um crédito pré-pago que você adquire no site da Gift Loves. O valor do presente é enviado por mensagem via whatsApp para o destinatário, que pode fazer a compra do presente em qualquer loja parceira, usando um código exclusivo.",
  },
  {
    id: 2,
    title: "Como posso comprar um cartão de presente virtual?",
    text: "Comprar um cartão de presente virtual é simples. Ao acessar o site, preencha as informações do destinatário (Nome, nascimento/dia/mês, WhatsApp, valor do cartão de presente e a mensagem a ser enviada), em seguida, faça o seu cadastro informando os seguintes dados pessoais (nome, CPF, telefone, e-mail e senha), após o cadastro você será direcionado para a tela de pagamento onde poderá escolher a opção mais conveniente para você, e pronto! O cartão será enviado por mensagem via whatsApp para o destinatário após a confirmação do pagamento.",
  },
  {
    id: 3,
    title: "Posso usar um cartão de presente virtual várias vezes?",
    text: "Sim, você pode usar um cartão de presente virtual várias vezes até que o saldo seja totalmente utilizado.",
  },
  {
    id: 4,
    title: "É seguro comprar um cartão de presente virtual neste site?",
    text: "Sim, oferecemos um ambiente virtual seguro para todas as transações. Utilizamos tecnologia de criptografia avançada para proteger suas informações pessoais e detalhes de pagamento.",
  },
  {
    id: 5,
    title:
      "É possível obter um reembolso em dinheiro pelo saldo não utilizado de um cartão de presente virtual?",
    text: "Não, o saldo não utilizado de um cartão de presente virtual não pode ser reembolsado em dinheiro. Ele só pode ser usado para compras nas lojas parceiras.",
  },
]

function FAQ() {
  return (
    <div className="pt-5">
      <h1 className="h3 gl-gray text-center mb-3">Perguntas Frequentes</h1>
      <div className="accordion mt-4" id="accordionExample">
        {accordion.map((accordion) => (
          <div className="accordion-item my-3 border " key={accordion.id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button focus-ring focus-ring-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#" + accordion.id.toString()}
                aria-expanded="true"
                aria-controls={accordion.id.toString()}
              >
                {accordion.title}
              </button>
            </h2>
            <div
              id={accordion.id.toString()}
              className="accordion-collapse collapse hidden "
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{accordion.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
