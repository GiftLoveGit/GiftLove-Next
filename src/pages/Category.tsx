import React, { useEffect } from "react"
import Navbar from "../partials/Navbar"
import Body from "../components/Category/Body"
import Footer from "../partials/Footer"

const Category: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Categorias`
  }, [])
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  )
}

export default Category
