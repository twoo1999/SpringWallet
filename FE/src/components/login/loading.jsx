import styled from "styled-components";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const Wrapper = styled.div`
    width: 100px;
    height: 100px;
`;
export function Loading(){
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");
    useEffect(() => {
        const GoogleLogin = async () => {
            await axios({
                method: "GET",
                url: `http://localhost:8080/auth/google?code=${code}`,
                withCredentials:true,
            }).then((res) => {
                navigate("/login");
            });
        };
        GoogleLogin();
    }, []);


    return (
        <Wrapper>
            로그인중
        </Wrapper>
    );
}