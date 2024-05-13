"use client"
import React, { useEffect } from "react"
// import Sidebar from "../../partials/Sidebar"
// import FooterDash from "../../partials/FooterDash"

const Extract: React.FC = () => {
    useEffect(() => {
        document.title = `GiftLove | Extratos`
    }, [])

    const currentPage = "Extratos"

    const dataTable = [
        {
            id: 1,
            description: "Aniversário da Mãe",
            value: "R$ 10,00",
            type: "Recebido",
            date: "20/02/2024",
        },
        {
            id: 2,
            description: "Aniversário do Pai",
            value: "R$ 10,00",
            type: "Enviado",
            date: "20/02/2024",
        },
        {
            id: 3,
            description: "Aniversário da Prima",
            value: "R$ 10,00",
            type: "Recebido",
            date: "20/02/2024",
        },
        {
            id: 4,
            description: "Mensagem de Natal",
            value: "R$ 10,00",
            type: "Enviado",
            date: "20/02/2024",
        },
        {
            id: 5,
            description: "Casamento",
            value: "R$ 10,00",
            type: "Enviado",
            date: "20/02/2024",
        },
    ]

    return (
        <>
            {/* <Sidebar currentPage={currentPage} /> */}
            <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
                <div className="d-flex flex-column flex-sm-row gap-4">
                    <div className="col bg-body rounded-4 shadow p-4">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">
                                        ID
                                    </th>
                                    <th scope="col" className="text-center">
                                        Descrição
                                    </th>
                                    <th scope="col " className="text-center">
                                        Valor
                                    </th>
                                    <th scope="col" className=" text-center">
                                        Tipo
                                    </th>
                                    <th
                                        scope="col-2 "
                                        className="d-none d-sm-table-cell text-center"
                                    >
                                        Data
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.description}</td>
                                        <td className="text-center">{item.value}</td>
                                        <td className="text-center">{item.type}</td>
                                        <td className="d-none d-sm-table-cell text-center">
                                            {item.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <FooterDash /> */}
        </>
    )
}

export default Extract
