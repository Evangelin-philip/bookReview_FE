import { Route, Routes } from "react-router-dom"
import { useState,useEffect } from "react"
import PreLoader from "./components/Preloader"
import Home from "./users/pages/Home"
import Auth from "./pages/Auth"
import AllBooks from "./users/pages/AllBooks"
import ViewBook from "./users/pages/ViewBook"

import PageNotFound from "./pages/PageNotFound";



function App() {
  const [isPageLoaded,setIsPageLoaded]=useState(false)
  useEffect(()=>{
  setTimeout(() => {
    setIsPageLoaded(true)
  }, 10);
  },[])

  return (
    <>
 
<Routes>
<Route path='/' element={isPageLoaded?<Home/>:<PreLoader/>}/>
<Route path='/login' element={<Auth/>}/>
  <Route path='/register' element={<Auth register/>}/>
  <Route path='/all-books' element={<AllBooks/>}/>
  <Route path='/view-book/:id' element={<ViewBook/>}/>


  <Route path="*" element={<PageNotFound/>}/>
</Routes>

    </>
  )
}

export default App
