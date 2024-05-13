import React, { useEffect } from "react"
import Navbar from "../partials/Navbar"
import Body from "../components/Home/Body"
import Footer from "../partials/Footer"

const Home: React.FC = () => {
  useEffect(() => {
    document.title = `GiftLove | Home`
  }, [])
  return (
    <div>
      <Navbar />
      <Body />
      <Footer />
    </div>
  )
}

export default Home
