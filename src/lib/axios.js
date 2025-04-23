import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"http://ec2-13-48-25-139.eu-north-1.compute.amazonaws.com/api",
    withCredentials:true,

})