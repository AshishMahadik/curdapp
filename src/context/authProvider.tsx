import { refreshToken } from "@/services/api";
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
                const tokenObj = await refreshToken();
                setToken(tokenObj.data.accessToken);
                console.log(token);
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