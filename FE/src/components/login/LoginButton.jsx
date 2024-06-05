import styled from "styled-components";
import "../../common/fonts.css"
import {useState} from "react";
import axios from "axios";
const Wrapper = styled
const Button = styled.button`
    position: absolute;
    top: 3rem;
    right: 3rem;
    
    background-color: inherit;
    border: 1px solid gray;
    border-radius: 3px;
    color: white;
    padding: 1rem;
    cursor: pointer;
`;

export function LoginButton(){

    const [isLogin, setLogin] = useState(window.sessionStorage.getItem("jwt") !== null);
    const onClick = async ()=>{
        if (isLogin) {

            await axios({
                method: "DELETE",
                url: `http://localhost:8080/auth`,
                withCredentials:true,
            }).then(res=>{
                sessionStorage.removeItem("jwt");
            })
        }
        window.location.href = "/login";


    }
    return(
        <Button onClick={onClick}>
            <span className="Regular12">{isLogin ? "로그아웃" : "로그인"}</span>
        </Button>

    )
}