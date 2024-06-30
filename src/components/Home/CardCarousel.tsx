"use client"
import { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import Image from 'next/image'
import { getDataGiftCards } from '@/actions/home';
import Link from "next/link";


export default function CardCarousel() {
    const [cardsData, setCardsData] = useState([]);
    useEffect(() => {
        const fetchCardsData = async () => {
            try {
                const data = await getDataGiftCards();
                setCardsData(data.data);
            } catch (error) {
                console.error('Erro ao obter dados de cards:', error);
            }
        };

        fetchCardsData();
    }, []);
    const bodyItems = cardsData.map(({ id, message, file, file_base64 }) => (
        <div className="item me-4 pb-1" key={id}>
            <div className="card shadow-sm border-0 h-100 p-sm-3 p-2 rounded-sm-5 rounded-4">
                <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE}/${file}`}
                    className="card-img-top rounded-sm-4 rounded-3"
                    alt={message}
                    width={183}
                    height={236}
                    placeholder="blur"
                    blurDataURL={file_base64}
                // style={{ height: 'auto' }}
                />
                <div className="card-body pb-0 pt-3 px-0">
                    <Link
                        href={`/cartao/${id}`}
                        className="btn btn-outline-yellow w-100 rounded-sm-4 rounded-3"
                        rel="nofollow"
                    >
                        Quero Esse
                    </Link>
                </div>
            </div>
        </div>
    ))
    return (
        <div className="pt-5">
            <h1 className="h3 gl-gray text-center mb-3">Mensagens Novinhas</h1>
            <AliceCarousel
                mouseTracking
                autoPlayInterval={3000}
                autoPlay
                infinite
                items={bodyItems}
                responsive={{ 0: { items: 2 }, 568: { items: 2 }, 1024: { items: 4 } }}
                controlsStrategy="alternate"
                disableButtonsControls
            />
        </div>
    )
}

