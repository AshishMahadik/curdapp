import { AuthContext } from "@/context/authProvider"
import { useContext, useEffect } from "react"
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";


export default function ProtectedRoute() {

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            nav('/login');
        }
    }, [token]);
    return <>
        <Outlet />
    </>
}