import Link from "next/link"

export default function FooterDash() {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-3 px-2 px-sm-5 mt-4">
      <p className="gl-gray text-center">
        © 2024 ❤ , by GiftLove Seu presente descomplicado.
      </p>
      <div className="d-flex gap-3">
        <Link className="text-decoration-none gl-gray" target="_blank" href="/#sobre-nos">
          Sobre nós
        </Link>
        <Link className="text-decoration-none gl-gray" target="_blank" href="/termos-de-uso">
          Temos de uso
        </Link>
      </div>
    </div>
  )
}
