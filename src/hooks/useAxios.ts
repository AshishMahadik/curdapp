import { AuthContext } from '@/context/authProvider';
import axios, { } from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export function useAxios() {
    const abort = new AbortController();
    const nav = useNavigate();
    const { token } = useContext(AuthContext)
    const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/api' });
    axiosInstance.interceptors.request.use(async (value) => {
        if(token){
            value.headers.Authorization = `Bearer ${token}`;
        } else {
            abort.abort();
        }
        return value;
    });
    axiosInstance.interceptors.response.use(async (value) => {
        if(value.status == 401){
            nav('/login');
        }
        return value;
    });
    return axiosInstance;
}