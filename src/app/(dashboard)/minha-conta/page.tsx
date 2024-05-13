import React from "react"
// import Sidebar from "@/partials/Sidebar"
// import FooterDash from "@/partials/FooterDash"

const Account: React.FC = () => {
    // useEffect(() => {
    //     document.title = `GiftLove | Minha Conta`
    // }, [])

    const currentPage = "Minha Conta"

    return (
        <>
            {/* <Sidebar currentPage={currentPage} /> */}
            <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
                <div className="d-flex flex-column flex-sm-row gap-4">
                    <div className="col bg-body rounded-4 shadow p-4">
                        <p>Informações da Conta</p>
                        <div className="row g-4 flex-column flex-sm-row">
                            <div className="col col-sm-6">
                                <label htmlFor="nome" className="form-label">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    value={"Nome Completo"}
                                    disabled
                                />
                            </div>
                            <div className="col col-sm-6">
                                <label htmlFor="CPF" className="form-label">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CPF"
                                    value={"050.050.050-05"}
                                    disabled
                                />
                            </div>
                            <div className="col col-sm-6">
                                <label htmlFor="telefone" className="form-label">
                                    Telefone/Whatsapp
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefone"
                                    value={"(96) 99999-9999"}
                                    disabled
                                />
                            </div>
                            <div className="col col-sm-6">
                                <label htmlFor="date" className="form-label">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="date"
                                    value={"18/12/2000"}
                                    disabled
                                />
                            </div>
                            <div className="col col-sm-6">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={"ename@example.com"}
                                    disabled
                                />
                            </div>
                            <div className="col col-sm-6">
                                <label htmlFor="senha" className="form-label">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    value={"minhasenha"}
                                    disabled
                                />
                            </div>
                        </div>
                        <button className="btn btn-blue mt-4 ">Editar</button>
                    </div>
                </div>
            </div>
            {/* <FooterDash /> */}
        </>
    )
}

export default Account
