import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { getAllBooksAPI, uploadBookAPI } from "../../services/allApi";
function AllBooks() {
  const [inputDetails,setInputDetails]=useState({
    title:"",author:"",description:"",imageUrl:""
  })
  console.log(inputDetails);
  
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState("")
  const [allBooks,setAllBook]=useState([])
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: ""
  });
  
  const openModal = () => {

      setErrors({ title: "", author: "", description: "", imageUrl: "" }); // reset errors
      setInputDetails({ title: "", author: "", description: "", imageUrl: "" }); // optionally reset input fields
      setOpen(true);
   
  };
    const validate = () => {
      const newErrors = {};
      if (!inputDetails.title.trim()) newErrors.title = "Title is required";
      if (!inputDetails.author.trim()) newErrors.author = "Author is required";
      if (!inputDetails.description.trim()) newErrors.description = "Description is required";
      if (!inputDetails.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    
      setErrors(newErrors);
    
      // Return true if no errors
      return Object.keys(newErrors).length === 0;
    };
    
    const handleAdd = async () => {
      if (!validate()) return; // stop if validation fails
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await uploadBookAPI(inputDetails, reqHeader);
    console.log(result);
    
      if (result.status === 200) {
        toast.success("Book added successfully!");
        setAllBook(result.data)
        setOpen(false);
        setErrors({ title: "", author: "", description: "", imageUrl: "" }); // reset errors
        setInputDetails({ title: "", author: "", description: "", imageUrl: "" }); // optionally reset input fields
       
      }else if(result.status===400){
toast.info("Book Alreday exists");
      } else {
        toast.error("Failed to add book!");
      }
    };
    
  

        const getAllBooks=async()=>{
          
          const result=await getAllBooksAPI()
          console.log(result);
          if(result.status==200){
            setAllBook(result.data)

          }
          
        }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    getAllBooks()
  },[allBooks])
  return (
    <p>
      <Header />
      <div className="bg-[#748DAE] text-white">
        <div className="text-center p-5">
         <div className="lg:grid md:grid-cols-3">
          <div></div>
            <div>
              <h1 className=" mt-5 text-3xl mb-5">All Books</h1>
              <p className="text-2xl text-red-700">Every book has a story, and so do you</p>
            </div>
            <div className="lg:flex items-end justify-end p-5">
         { token ?  <button
        onClick={openModal}
        className="rounded-md bg-[#FFD6BA] px-2.5 py-1.5 text-lg font-semibold text-green-800 inset-ring inset-ring-white/5 hover:bg-[#D4AF37]/200"
      >
        <FontAwesomeIcon icon={faPlus} beatFade  style={{color: "#2C6E49"}} className="me-3"/>
        Add New Book
      </button>
    :
                <Link to={'/login'}>  <div className="font-bold text-green-800  w-75 bg-[#FFD6BA] p-5">Please login to add new Book<FontAwesomeIcon icon={faArrowRightToBracket} beat  className="fa-lg text-green-800 ms-3"/></div></Link>
      
    }
            </div>
         </div>
         {allBooks?.length>0?
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {
    allBooks.map((book,index)=>(
      <div className="p-5 mt-5" key={index} >
            <div className="p-5 shadow-md bg-[#ffe6ff] rounded rounded-5">
              <Link to={`/view-book/${book._id}`}>
                <img
                  src={book.imageUrl}
                  alt="No image"
                  style={{ width: "100%", height: "250px" }}
                />
              </Link>
              <div className="flex justify-center items-center flex-col mt-3">
                <h3 className="text-[#2C6E49] sm:font-bold">
                  {" "}
                  {book.title}
                </h3>
                <p className="text-[#2C6E49] ">{book.author}</p>

                <Link to={`/view-book/${book._id}`} className="w-full">
                  {" "}
                  <button className="bg-[#2C6E49] my-5 text-white py-2 px-4 hover:border hover:border-blue-900 hover:bg-white hover:text-blue-950 w-full mt-3">
                    {" "}
                    View Book
                  </button>
                </Link>
              </div>
            </div>
          </div>
    ))
  }
  
       
          </div>:
          
            <p className=" text-[#D4AF37] text-xl p-5 mt-5 text-center">No books uploaded yet!! <br /> Please upload Books to view ...</p>}
        </div>
        <div></div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-400" />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-white mb-5">
                     Add A New Book
                    </DialogTitle>
                    < form action="" >

                    <div className="mb-3">
  <input
    value={inputDetails.title}
    onChange={(e) => setInputDetails({ ...inputDetails, title: e.target.value })}
    type="text"
    className={`  text-white form-control w-full p-2 border rounded placeholder-gray-400 ${errors.title ? "border-[#D4AF37]" : "border-gray-400"}`}
    placeholder="Book Title"
  />
  {errors.title && <p className="text-[#D4AF37] text-sm mt-1">{errors.title}</p>}
</div>

<div className="mb-3">
  <input
    value={inputDetails.author}
    onChange={(e) => setInputDetails({ ...inputDetails, author: e.target.value })}
    type="text"
    className={`text-white form-control w-full p-2 border rounded placeholder-gray-400 ${errors.author ? "border-[#D4AF37]" : "border-gray-400"}`}
    placeholder="Author"
  />
  {errors.author && <p className="text-[#D4AF37] text-sm mt-1">{errors.author}</p>}
</div>

<div className="mb-3">
  <textarea
    value={inputDetails.description}
    onChange={(e) => setInputDetails({ ...inputDetails, description: e.target.value })}
    className={`text-white form-control w-full p-2 border rounded placeholder-gray-400 ${errors.description ? "border-[#D4AF37]" : "border-gray-400"}`}
    placeholder="Description"
    rows={4}
  />
  {errors.description && <p className="text-[#D4AF37] text-sm mt-1">{errors.description}</p>}
</div>

<div className="mb-3">
  <input
    value={inputDetails.imageUrl}
    onChange={(e) => setInputDetails({ ...inputDetails, imageUrl: e.target.value })}
    type="text"
    className={`text-white form-control w-full p-2 border rounded placeholder-gray-400 ${errors.imageUrl ? "border-[#D4AF37]" : "border-gray-400"}`}
    placeholder="Image URL"
  />
  {errors.imageUrl && <p className="text-[#D4AF37] text-sm mt-1">{errors.imageUrl}</p>}
</div>

                      </form>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFD6BA] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex w-full justify-center rounded-md bg-[#2C6E49] px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                >
                  Add
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
            <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </p>
  );
}


export default AllBooks;
