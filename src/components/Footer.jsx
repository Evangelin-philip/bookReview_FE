import React from 'react'

function Footer() {
  return (
    <div>
      

<footer className="rounded-lg shadow-sm bg-[#FFD6BA] ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/images/logo-light.png" className="h-[80px]" alt=" Logo" />
    
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-900 font-bold sm:mb-0 ">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <p className="text-sm text-green-900 sm:text-center">
  © 2025 Leafline™. All Rights Reserved.
</p>    </div>
</footer>


    </div>
  )
}

export default Footer
