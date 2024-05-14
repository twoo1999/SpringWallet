import styled from "styled-components";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import '../../common/fonts.css'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10rem;
    align-items: center;
    gap: 5rem;
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
                window.sessionStorage.setItem("jwt", "Google");
                navigate("/");
            });
        };
        GoogleLogin();
    }, []);


    return (
        <Wrapper>
            <span className="ExtraBold22">
                로그인 중...
            </span>
        </Wrapper>
    );
}