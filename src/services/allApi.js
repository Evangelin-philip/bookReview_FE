
import { commonAPI } from "./commonApi";
import { serverURL } from "./serverUrl";

//register API-content type=application/json
// of header is not passing axios set header as application/json  that is no system uploads
// 1
export const registerAPI = async(reqBody)=>{
    // RETURNS TO WHERE THE UFNCTION IS CALLED
    return await commonAPI('POST',`${serverURL}/api/register`,reqBody)
}

// 2
// LOGIN API
export const loginAPI=async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/api/login`,reqBody)
}

// 3
// // GOOGLE LOGIN API
// export const googleLoginAPI=async(reqBody)=>{
//     console.log(reqBody);
    
//     return await commonAPI('POST',`${serverURL}/google-login`,reqBody)
// }








//---------------------------------------------------------------------------------USER--------------------------------------------------------------------------
// 4
export const uploadBookAPI=async (reqBody,reqHeader)=>{
    return await commonAPI('POST',`${serverURL}/api/books`,reqBody,reqHeader)
}





//api to get all books
export const getAllBooksAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${serverURL}/api/books`,"",reqHeader)
    // return await commonAPI('GET',`${serverURL}/all-books`,"",reqHeader)
}

//api to get a books
export const getABooksAPI=async(id)=>{
    return await commonAPI('GET',`${serverURL}/api/books/${id}`)
}

export const addReviewAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI('POST',`${serverURL}/api/books/${id}/review`,reqBody,reqHeader)
}
