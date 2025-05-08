import axios from "axios"

const BASE_URL = `https://api.videomaker.digielvestech.in`

export const employeelogin = async (data)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/login/`,data)
        return response.data   
    } catch (error) {
        console.log("Error in login", error)
        throw error
    }
     
}

export const doctorVideoGeneration = async (FormData) =>{
    try {   
        const response = await axios.post(`${BASE_URL}/api/generate-video/`, FormData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log("Error in Adding doctorVideoGeneration details" ,error)
        throw error
    }
}

export const employeeCreation = async (data) =>{
    try {
        const response = await axios.post(`${BASE_URL}/api/employees/`, data)
        return response.data
    } catch (error) {
        console.log("Error in creation of employee" , error)
        throw error
    }
}

export const getAllDoctors = async () =>{
     try {
        const response= await axios.get(`${BASE_URL}/api/doctors/`)
        return response.data
     } catch (error) {
        console.log('Error In Getting All Doctors Record', error)
        throw error
     }
}