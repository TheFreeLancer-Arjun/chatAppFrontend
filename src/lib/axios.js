import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"https://chatappbackend-81ht.onrender.com",
    withCredentials:true,

})