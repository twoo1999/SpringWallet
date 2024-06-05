import { Navigate, Outlet } from "react-router-dom";
import {useCookies} from "react-cookie";
export const PrivateRoute = () => {
    const isLogin = window.sessionStorage.getItem("jwt") !== null;
    // console.log(window.sessionStorage.getItem("jwt"))
    // console.log(isLogin)
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
};