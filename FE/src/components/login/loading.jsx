import styled from "styled-components";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import '../../common/fonts.css'
import {getApi} from "../../axiosIntercepter";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10rem;
    align-items: center;
    gap: 5rem;
`;
export function Loading(){
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code");
    useEffect(() => {
        const GoogleLogin = async () => {
            try{
                await getApi(`${process.env.REACT_APP_API_URL}/auth/google?code=${code}`);
                window.sessionStorage.setItem("jwt", "Google");
            } catch (err){
                alert("로그인 실패");
            }
            window.location.href = "/";

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