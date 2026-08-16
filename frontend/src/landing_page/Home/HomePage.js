import React from 'react'
import  Kite  from './Kite'
import Education from './Education'
import Hero from './Hero'
import Navbar from '../Navbar'
import Stats from './Stats'
import Pricing from './Pricing'
import OpenAccount from '../OpenAccount'
import Footer from '../Footer'
const HomePage = () => {
  return (
    <>
     <Hero/>
     <Stats/>
     {/* <Kite/> */}
     <Pricing/>
     <Education/>
     <OpenAccount/>
    </>
  )
}

export default HomePage