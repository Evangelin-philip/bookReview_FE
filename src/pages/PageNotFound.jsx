import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="md:grid grid-cols-3">
            <div></div>
            <div className='flex justify-center items-center flex-col p-5 md:p-0'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4RAj8SKq2elTkOPz4Y633vvB2nds6FGPsw&s" alt="Page not found" />
         <p>Oh no!</p>
         <h1 className='text-2xl lg:text-4xl md:text-3xl'>Looking like you're lost</h1>
<h3>Page you are looking for is not available</h3>
<Link to={"/"}>
    <button className='bg-blue-800 mt-4 py-2 px-3 text-white rounded hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900'>Back to home</button>
    
</Link>
            </div>
            <div></div>

        </div>
      </div>
    </>
  )
}

export default PageNotFound
