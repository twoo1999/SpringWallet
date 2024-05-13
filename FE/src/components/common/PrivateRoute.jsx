import { Navigate, Outlet } from "react-router-dom";
import {useCookies} from "react-cookie";
export const PrivateRoute = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["AccessToken"]);
    const isLogin = cookies.AccessToken !== undefined;
    return isLogin ? <Outlet /> : <Navigate to="/signin" />;
};