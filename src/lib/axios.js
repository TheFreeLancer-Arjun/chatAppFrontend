import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"http://13.60.245.155:5000/api",
    withCredentials:true,

})