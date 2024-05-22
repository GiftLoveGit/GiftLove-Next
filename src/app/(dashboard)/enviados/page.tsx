
import cartaoIMG from "@/assets/card.png"
import Image from "next/image"

export default async function Recevied() {
    // useEffect(() => {
    //     document.title = `GiftLove | Recebidos`
    // }, [])

    const currentPage = "Recebidos"

    const dataTable = [
        {
            id: 1,
            card: cartaoIMG,
            sender: "Usuario 1",
            value: "R$ 10,00",
            date: "20/02/2024",
        },
        {
            id: 2,
            card: cartaoIMG,
            sender: "Usuario 2",
            value: "R$ 10,00",
            date: "20/02/2024",
        },
        {
            id: 3,
            card: cartaoIMG,
            sender: "Usuario 3",
            value: "R$ 10,00",
            date: "20/02/2024",
        },
        {
            id: 4,
            card: cartaoIMG,
            sender: "Usuario 4",
            value: "R$ 10,00",
            date: "20/02/2024",
        },
        {
            id: 5,
            card: cartaoIMG,
            sender: "Usuario 5",
            value: "R$ 10,00",
            date: "20/02/2024",
        },
    ]

    return (
        <div className=" px-2 px-sm-5" style={{ minHeight: "85vh" }}>
            <div className="d-flex flex-column flex-sm-row gap-4">
                <div className="col bg-body rounded-4 shadow p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">
                                    Cartão
                                </th>
                                <th scope="col" className="text-center">
                                    Presenteador
                                </th>
                                <th scope="col " className="text-center">
                                    Valor
                                </th>
                                <th
                                    scope="col"
                                    className="d-none d-sm-table-cell text-center"
                                >
                                    Data
                                </th>
                                <th scope="col-2 " className="text-center">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-center">
                                        <Image
                                            src={item.card}
                                            alt={`chame ${item.card}`}
                                            className="img-fluid rounded-3"
                                            width={120}
                                        />
                                    </td>
                                    <td className="text-center">{item.sender}</td>
                                    <td className="text-center">{item.value}</td>
                                    <td className="d-none d-sm-table-cell text-center">
                                        {item.date}
                                    </td>
                                    <td className="text-center">
                                        <a
                                            href={`/recebidos/${item.id}`}
                                            className="btn btn-blue"
                                        >
                                            Visualizar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}