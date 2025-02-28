import { AuthContext } from '@/context/authProvider';
import axios, { } from 'axios'
import { useContext } from 'react';


export function useAxios() {
    const { token } = useContext(AuthContext)
    const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/api' });
    axiosInstance.interceptors.request.use(async (value: any) => {
        // const tokenObj = await axios.get('http://localhost:8080/api/auth/refresh-token', {withCredentials: true});
        // console.log('interfaceToken',tokenObj);

        value.headers.Authorization = `Bearer ${token}`;
        return value;
    });
    return axiosInstance;
}