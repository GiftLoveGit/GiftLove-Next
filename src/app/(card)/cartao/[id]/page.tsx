"use client"
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react"
// import { useNavigate } from "react-router-dom"
import Navbar from "@/partials/Navbar"
import Footer from "@/partials/Footer"
import cartaoIMG from "@/assets/card.png"
// import InputMask from "react-input-mask"
import Image from "next/image"


interface FormState {
    name: string
    birthDate: string
    whatsapp: string
    price: string
    message: string
}

export default function Show() {
    // useEffect(() => {
    //     document.title = `GiftLove | Cartão`
    // }, [])

    // const navigate = useNavigate()
    const [formData, setFormData] = useState<FormState>({
        name: "",
        birthDate: "",
        whatsapp: "",
        price: "",
        message: "",
    })

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //   event.preventDefault()
    //   navigate(
    //     `/card-preview?name=${formData.name}&birthDate=${formData.birthDate}&whatsapp=${formData.whatsapp}&price=${formData.price}&message=${formData.message}`
    //   )
    // }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const queryParams = new URLSearchParams({
            name: formData.name,
            birthDate: formData.birthDate,
            whatsapp: formData.whatsapp,
            price: formData.price,
            message: formData.message,
        })
        // navigate(`/card-preview?${queryParams}`)
    }

    return (
        <div className="container-md mt-5 pt-5">
            <div className="d-flex flex-column flex-sm-row">
                <div className="col d-flex justify-content-center mb-5 mb-sm-0">
                    <Image
                        className="gli-image img-fluid h-100 rounded-4"
                        src={cartaoIMG}
                        alt="Cartão Exemplo"
                    />
                </div>
                <div className="col ">
                    <div className="shadow p-4 p-sm-5 rounded-4">
                        <h3 className="glt-blue text-center">Personalize seu cartão</h3>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="inputName" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Nome"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDate" className="form-label">
                                    Nascimento dia/mes
                                </label>
                                <input
                                    // mask="99/99"
                                    // maskChar="_"
                                    placeholder="DD/MM"
                                    className="form-control"
                                    id="inputDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputNumber"
                                    className="form-label gl-gray"
                                    data-mask="(00) 0000-0000"
                                >
                                    Whatsapp
                                </label>
                                <input
                                    // mask="(99) 99999-9999"
                                    // maskChar="_"
                                    className="form-control"
                                    id="inputNumber"
                                    placeholder="(__) _____-____"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPrice" className="form-label">
                                    Valor do Cartão de Presente
                                </label>
                                <input
                                    type="number"
                                    placeholder="R$ 10,00"
                                    className="form-control"
                                    id="inputPrice"
                                    min="0.01"
                                    step="0.01"
                                    max="100000"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputMessage" className="form-label">
                                    Mensagem
                                </label>
                                <textarea
                                    className="form-control"
                                    placeholder="Deixe sua mensagem aqui"
                                    id="inputMessage"
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button className="w-100 btn btn-blue " type="submit">
                                    Visualizar Cartão
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
