import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<any>('');


export function AuthProvider({ children }: any) {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const nav = useNavigate();
    useEffect(() => {
        const genRandomKey = async () => {
            try {
                const tokenObj = (await axios.get('http://localhost:8080/api/auth/refresh-token', { withCredentials: true }));
                setToken(tokenObj.data.accessToken);
            } catch (e) {
                nav('/login');
            } finally {
                setLoading(false);
            }
        };
        genRandomKey();
    }, []);
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {loading ? <div>Loading</div> : children}
        </AuthContext.Provider>)
}