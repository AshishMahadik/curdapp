import axios, { AxiosInstance } from 'axios'

const url = 'http://localhost:8080/api';


export async function login(data:any) {
    const login = await axios.post(`${url}/auth/login`,data,{withCredentials:true});
    return login.data;
}

export async function register(data:any) {
    const login = await axios.post(`${url}/auth/register`,data,{withCredentials:true});
    return login.data;
}

export async function refreshToken() {
    const login = await axios.get(`${url}/auth/refresh-token`,{withCredentials:true});
    return login;
}

export async function getEmployees(axiosInstance:AxiosInstance) {
    const employees = await axiosInstance.get(`/employees`,{withCredentials:true});
    return employees.data;
}