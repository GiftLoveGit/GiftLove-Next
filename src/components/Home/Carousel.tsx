import React from "react"
import banner1 from "@/assets/banner1.png"
import banner2 from "@/assets/banner2.png"
import banner3 from "@/assets/banner3.png"
import Image from "next/image"

export default function Carousel(){
  const images = [banner1, banner2, banner3]

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className=" carousel-indicators position-absolute top-100">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={
              index === 0
                ? "active mx-2 gl-indicators gl-blue rounded-circle"
                : "mx-2 gl-indicators gl-blue rounded-circle"
            }
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner rounded-sm-5 rounded-4 ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <Image
              src={image}
              className="d-block w-100"
              alt={`Imagem ${index + 1}`}
              height={300}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
