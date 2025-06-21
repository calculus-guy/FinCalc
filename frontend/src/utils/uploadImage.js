import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-Type' : 'multipart/form-data', // set header for file upload
            }
        })
        return response.data
    }
    catch(err){
        console.log('Error Uploading the image', err)
        throw err
    }
}

export default uploadImage