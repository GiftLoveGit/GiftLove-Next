export default function LatestSubmissions() {
    const dataSent = [
        {
            id: 1,
            date: "01 de Março de 2020",
            transitionId: "#MS-415646",
            value: "25,50",
        },
        {
            id: 2,
            date: "03 de Março de 2020",
            transitionId: "#MS-412646",
            value: "25,50",
        },
        {
            id: 3,
            date: "09 de Março de 2020",
            transitionId: "#MS-412646",
            value: "25,50",
        },
        {
            id: 4,
            date: "10 de Março de 2020",
            transitionId: "#MS-412646",
            value: "25,50",
        },
        {
            id: 5,
            date: "12 de Março de 2020",
            transitionId: "#MS-412646",
            value: "25,50",
        },
    ]
    return (
        <div className="col-lg-4 col-md-5  col bg-body rounded-4 shadow p-4">
                    <div className="d-flex justify-content-between">
                        <p> Ultimos Envios</p>
                        <a className="btn btn-outline-blue" href="/sent">
                            Ver todos all
                        </a>
                    </div>
                    <ul className="list-group">
                        {dataSent.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item border-0 p-0 mt-4"
                            >
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <div className="d-flex flex-column">
                                        <p className="mb-0">{item.date}</p>
                                        <small>{item.transitionId}</small>
                                    </div>
                                    <div className="">
                                        <span className="me-3">R$ {item.value}</span>
                                        <a className="text-decoration-none text-muted" href="/">
                                            <i className="bx bxs-file-pdf"></i> PDF
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
    )
}