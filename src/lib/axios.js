import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"http://13.48.25.139:5000/api",
    withCredentials:true,

})