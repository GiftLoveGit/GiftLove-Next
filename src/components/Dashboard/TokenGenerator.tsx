import React, { useState, useEffect } from "react"

const TokenGenerator: React.FC = () => {
  const [token, setToken] = useState<string>("") // Estado para armazenar o token gerado
  const [expiryWidth, setExpiryWidth] = useState<number>(100) // Largura inicial da barra de expiração

  useEffect(() => {
    // Função para gerar um token de 8 dígitos aleatórios
    const generateToken = () => {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000)
      setToken(randomNumber.toString().substring(0, 8))
    }

    generateToken() // Gerar um token inicial quando o componente for montado

    // Diminuir a largura da barra de expiração ao longo do tempo
    const timer = setTimeout(() => {
      setExpiryWidth(0) // Diminui a largura para 0 após 1 segundo
    }, 1000)

    return () => clearTimeout(timer) // Limpa o timer ao desmontar o componente
  }, [])

  return (
    <div>
      {/* Exibir o token e a barra de expiração */}
      <div className="d-flex justify-content-center">
        <div className="token-container">
          {token.split("").map((digit, index) => (
            <div className="d-flex align-items-center" key={index}>
              <div className="token-digit border rounded-3 border-1 px-2 mx-2">
                {digit}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="token-expiry-bar"
        style={{ width: `${expiryWidth}%`, transition: "width 10s linear" }}
      ></div>
    </div>
  )
}

export default TokenGenerator
