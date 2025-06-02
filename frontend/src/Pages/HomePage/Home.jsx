import React from 'react'
import Hero from '../../Components/Hero/Hero'
import About from '../../Components/About/About'
import Footer from '../../Components/Footer/Footer'
import Service from '../../Components/Service/Service'
import SplashCursor from '../../Cursor/SplashCursor'

function Home() {
  return (
    <div>
    <SplashCursor /> 
    <Hero />
    <About />
    <Service />
    <Footer />
  </div>
  )
}

export default Home
