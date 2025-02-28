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
    const login = await axios.get(`${url}/auth/refresh-token`,{withCredentials:true, timeout: 1000});
    return login;
}

export async function self(axiosInstance:AxiosInstance) {
    const user = await axiosInstance.get(`/auth/self`,{withCredentials:true});
    return user.data.user;
}

export async function logout(axiosInstance:AxiosInstance) {
    const user = await axiosInstance.get(`/auth/logout`,{withCredentials:true});
    return user;
}

export async function getEmployees(axiosInstance:AxiosInstance) {
    const employees = await axiosInstance.get(`/employees`,{withCredentials:true});
    return employees.data;
}