import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    <Header/>
  <section className=' bg-[#748DAE] md:grid md:grid-cols-6'>
  <div className='col-span-2 flex justify-center items-center'><img src="/images/landing.png" className="md:w-full w-3/4" alt="" /></div>
 <div className='flex justify-center items-center flex-col text-white col-span-4 p-5'>
 <h2 className="md:text-4xl text-2xl mt-5 mb-5 text-pink-800 font-bold">
 Own every story with LEAFLINE!.

</h2>
  <p className='text-lg p-5 text-justify'>“Welcome to Leafline — your modern bookstore, reimagined. Discover timeless classics, trending bestsellers, and hidden gems, all curated just for you. Whether you’re seeking inspiration, adventure, or comfort, Leafline brings the joy of reading to your fingertips. Read anywhere, anytime, and let every page take you somewhere new.”</p>

<h1 className='text-center md:text-4xl text-2xl text-green-800'>  Read anywhere. 
Explore everywhere</h1>
<Link to={'/all-books'}>
  <button type="button" className=" mt-10 text-white bg-gradient-to-r from-[#d4af37] to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore Now <FontAwesomeIcon icon={faAnglesRight} beat /></button>
  
</Link>
 </div>

  </section>
      <Footer/>
    </>
  )
}

export default Home
