import styled from "styled-components";
import {ReactComponent as Overview} from "../../assets/Overview.svg";
import {ReactComponent as Record} from "../../assets/Record.svg";
import {ReactComponent as Fast} from "../../assets/Fast.svg";
import {ReactComponent as AI} from "../../assets/AI.svg";
import {ReactComponent as Goal} from "../../assets/Goal.svg";
import "../../common/fonts.css"
import {ReactComponent as Logout} from "../../assets/Logout.svg";
import {ReactComponent as Login} from "../../assets/Login.svg";
import {useLocation, useNavigate} from "react-router-dom";
const MenuStr = styled.span`
    color: white;
    flex-grow: 1;
    text-align: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    border-radius: 4px;
    padding: 12px 16px;    
    width: 15rem;
    background: ${props=>props.bColor};
    cursor: pointer;
`;
export function NavButton({path, content}) {
    const strs = ["한 눈에 보기", "기록", "빠른 기록", "AI 분석", "목표", "로그인", "Logout"]
    let icon;
    const location = useLocation();
    const navigate = useNavigate();
    const bColor = path === location.pathname ? '#299D91' : '#191919';
    switch (path) {
        case '/overview':
            icon = <Overview></Overview>;
            break;
        case '/record':
            icon = <Record></Record>;
            break;
        case '/fast-record':
            icon = <Fast></Fast>;
            break;
        case '/AI':
            icon = <AI></AI>;
            break;
        case '/goals':
            icon = <Goal></Goal>
            break;
        case '/login':
            icon = <Login></Login>;
            break;
        case '/logout':
            icon = <Logout></Logout>;
            break;
    }
    return (
        <Wrapper onClick={()=>{
            window.location.replace(path);
            // navigate(path);
        }} bColor={bColor}>
            {icon}
            <MenuStr className="Bold16">{content}</MenuStr>
        </Wrapper>

    );
}