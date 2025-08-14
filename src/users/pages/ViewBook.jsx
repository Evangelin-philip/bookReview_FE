import React, { useState,useEffect } from "react";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faBackward } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { addReviewAPI, getABooksAPI } from "../../services/allApi";
import { ToastContainer,toast } from "react-toastify";

// Component for star rating input
const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 text-3xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Component to display stars for reviews
const StarRatingDisplay = ({ rating }) => {
  return (
    <div className="text-yellow-400 text-lg">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <span key={star}>&#9733;</span>
        ) : (
          <span key={star} className="text-gray-300">&#9733;</span>
        )
      )}
    </div>
  );
};

function ViewBook() {
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState("");
  const [bookDetails,setBookDetails]=useState({})
  const [token,setToken]=useState("")
 const {id}=useParams()
  const viewBook=async(id)=>{

    
    const result=await getABooksAPI(id)


    
   setBookDetails(result.data[0])
 
   
    
  }

  const [errors, setErrors] = useState({});
const [isFormValid, setIsFormValid] = useState(false);

const validateField = (name, value) => {
  let message = "";

  if (name === "rating") {
    if (value === 0) message = "Please select a star rating.";
  }

  if (name === "comment") {
    if (!value.trim()) {
      message = "Please write a comment.";
    } else if (value.trim().length < 5) {
      message = "Comment should be at least 5 characters long.";
    }
  }

  setErrors((prev) => {
    const updated = { ...prev, [name]: message };
    setIsFormValid(!Object.values(updated).some((err) => err) && rating > 0 && comment.trim().length >= 5);
    return updated;
  });
};

const handleReviewSubmit = async (e) => {
  e.preventDefault();

  // Local validation
  const newErrors = {};
  if (rating <= 0) newErrors.rating = "Please select a star rating.";
  if (!comment.trim()) {
    newErrors.comment = "Please write a comment.";
  } else if (comment.trim().length < 5) {
    newErrors.comment = "Comment should be at least 5 characters long.";
  }

  // Update state with validation messages
  setErrors(newErrors);

  // If any errors, stop submit
  if (Object.keys(newErrors).length > 0) return;

  const reviewData = { rating, comment };
  const reqHeader = { Authorization: `Bearer ${token}` };

  try {
    const result = await addReviewAPI(id, reviewData, reqHeader);

    if (result.status === 200) {
      toast.success(result.data);
    } else if (result.status === 409) {
      toast.info(result.response.data);
    } else if (result.data === 401) {
      toast.info(result.response.data);
    } else {
      toast.error("Something went wrong, please try again");
    }

    // Reset form after any response
    setRating(0);
    setcomment("");
    setErrors({});
    setIsFormValid(false);
    viewBook(id);

  } catch (err) {

    toast.error("Something went wrong, please try again");
  }
};


  // const handleReviewSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const reviewData = {
  //     rating,
  //     comment
  //   };

  //   const reqHeader = {
  //     Authorization: `Bearer ${token}`,
  //   };
  
  //   try {

      
  //     const result = await addReviewAPI(id,reviewData,reqHeader)
  //     console.log(result);
  //     if(result.status===200){
  //       toast.success(result.data)
  //       setRating(0)
  //         setcomment("")
  //         viewBook(id)
  //     }else if(result.status===409){
  //       toast.info(result.response.data)
  //     }else if(result.data===401){
  //       toast.info(result.response.data)
  //     }else if(result.status==400){
  //       if(result.response.data.errors){
  //         toast.info("Please fill the form completely!!")
  //       }
  //     }else {
  //       toast.error("Something went wrong , please try again")
  //     }
      
  //   } catch (err) {
  //     console.error("Error submitting review:", err);
  //  toast.error("Something went wrong , please try again")
  //   }
  // };

  
    useEffect(()=>{
      viewBook(id)
      if(sessionStorage.getItem("token")){
       setToken(sessionStorage.getItem("token"))
      }
  
    },[])
  
  return (
    <div>
      <Header />

{ bookDetails?     <div className="md:p-20 p-5 bg-[#748DAE]">
        <div className="md:p-10 p-3 shadow w-full bg-[#FFD6BA]">

          <div className="lg:grid lg:grid-cols-[1fr_2fr] w-full gap-5">
            <div className="flex justify-center items-center">
              <img
                src={bookDetails.imageUrl}
                alt="Book"
                className="w-3/4 h-[300px]"
              />
            </div>

            <div className="px-4 mt-5 md:mt-0">
              <h1 className="text-center font-medium text-4xl text-[#2C6E49]">{bookDetails.title}</h1>
              <p className="text-red-500 text-center mt-3 text-2xl">{bookDetails.author}</p>
              <p className="text-justify mt-10">
              {bookDetails.description}              </p>
              <br />
              <p> Uploaded on : {bookDetails.createdAt} by {bookDetails.userMail}</p>
              <p className="under">
  Uploaded by:{" "}
  <a
    href={`mailto:${bookDetails.userMail}`}
    className="text-blue-600 hover:underline"
  >
    {bookDetails.userMail}
  </a>
</p>

            </div>
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="px-5 py-10 mt-10">
          <h2 className="text-3xl text-center text-white mb-10">What Our Users Say!</h2>

          <div className="grid lg:grid-cols-[3fr_1fr] gap-5">
            {/* Existing reviews */}
            {bookDetails?.reviews?.length>0?
            <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {bookDetails.reviews.map((review,index)=>(
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[250px]" key={index}>
          <StarRatingDisplay rating={review.rating} />
        <p className="text-xs">{review.createdAt}</p>
          <p className="text-gray-700 mt-4 flex-grow">&ldquo;{review.comment}&rdquo;</p>
          <p className="text-right mt-4 font-semibold text-gray-900">{review.userName.charAt(0).toUpperCase() + review.userName.slice(1).toLowerCase()}</p>
        </div>
       ))}
            </div>
            :
            <p className="text-2xl text-center">No Reveiws yet, Be the first to review this book</p>
            }
        

            {/* Review form */}
            <div>
            {token?  
            // <form
            //     onSubmit={handleReviewSubmit}
            //     className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-2xl space-y-4"
            //   >
            //     <h2 className="text-2xl font-bold text-gray-800 mt-5">Write a Review</h2>

            //     <div>
            //       <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            //       <StarRatingInput rating={rating} setRating={setRating} />
            //     </div>

            //     <div>
            //       <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            //         comment
            //       </label>
            //       <textarea
            //         id="comment"
            //         name="comment"
            //         rows="4"
            //         className="block w-full border border-gray-300 rounded-md p-2 focus:ring-[#2C6E49] focus:border-[#2C6E49]"
            //         placeholder="Write your review here..."
            //         required
            //         value={comment}
            //         onChange={(e) => setcomment(e.target.value)}
            //       ></textarea>
            //     </div>

            //     <button
            //       type="submit"
            //       onClick={handleReviewSubmit}
            //       className="w-full bg-[#2C6E49] text-white font-medium py-2 px-4 rounded-md hover:bg-[#26553A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C6E49]"
            //     >
            //       Submit Review
            //     </button>
            //   </form>
            <form onSubmit={handleReviewSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-2xl space-y-4">
  <h2 className="text-2xl font-bold text-gray-800 mt-5">Write a Review</h2>

  {/* RATING */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
    <StarRatingInput
      rating={rating}
      setRating={(value) => {
        setRating(value);
        validateField("rating", value);
      }}
    />
    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
  </div>

  {/* COMMENT */}
  <div>
    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
      Comment
    </label>
    <textarea
      id="comment"
      name="comment"
      rows="4"
      className={`block w-full border rounded-md p-2 focus:ring-[#2C6E49] focus:border-[#2C6E49] ${
        errors.comment ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Write your review here..."
      value={comment}
      onChange={(e) => {
        setcomment(e.target.value);
        validateField("comment", e.target.value);
      }}
    ></textarea>
    {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
  </div>

  {/* SUBMIT BUTTON */}
  <button
    type="submit"
    disabled={!isFormValid}
    className={`w-full font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C6E49] ${
      isFormValid ? "bg-[#2C6E49] text-white hover:bg-[#26553A]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    Submit Review
  </button>
</form>

              :
            <Link to={'/login'}>  <div className="font-bold text-[#2C6E49] w-75 bg-red-300 p-5">Please login to add review<FontAwesomeIcon icon={faArrowRightToBracket} beat  className="fa-lg text-green-800 ms-3"/></div></Link>
              }
            </div>
          </div>

          {/* Back button */}
          <div className="mt-10 flex justify-end">
            <Link to="/all-books">
              <button className="px-4 py-3 bg-[#D4AF37] rounded text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800">
                <FontAwesomeIcon icon={faBackward} beat className="me-2" /> Back to All Books
              </button>
            </Link>
          </div>
        </div>
      </div>
      :
 
 
   <p className="text-2xl">Network error please try after sometime </p>
  }
        <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}

export default ViewBook;
