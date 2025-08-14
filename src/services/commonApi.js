import axios from 'axios'

export const  commonAPI=async (httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod ,
        // url:url
        url,
        data: reqBody,
        headers:reqHeader
      }

    // axios config
// RETURNS TO WHERE THE UFNCTION IS CALLED
    return await axios(reqConfig).then((res)=>{

        
        return res;
    }).catch((error)=>{
        return error
    })
}
