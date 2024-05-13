import {ReactComponent as Logo} from "../../assets/Logo.svg";
import "./Nav.css";
import {NavButton} from "./NavButton";
import styled from "styled-components";
import {UserInfo} from "./UserInfo";
import {useState} from "react";
import {useLocation} from "react-router-dom";

const MenuLogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap:40px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;


const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;
// const MenuList = styled.div`
//     width: 224px;
//     display: flex;
//     gap: 16px;
// `;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding: 48px 28px;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: #191919;
    
`;

const LogoAndUserTab = styled.div`
    
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    height: 20rem;
`;

const MenuList = styled.div`
    display: flex;
    width: 100rem;
`;
export function NavBar() {
    const location = useLocation();
    const listMenu = [];
    const strs = ["한 눈에 보기", "기록", "빠른 기록", "AI 분석", "목표", "설정", "Logout"]
    const paths = ["/overview", "/record", "/fast-record", "/AI", "/goals", "/setting"];
    for (let i = 0; i < 6; i++) {
        const bColor = paths[i] === location.pathname ? '#299D91' : '#191919';
        listMenu.push(<NavButton type={paths[i]} bColor={bColor} num={i} content={strs[i]}></NavButton>);
    }
    return (
        <Wrapper>
            <LogoAndUserTab>
                <Logo></Logo>
            </LogoAndUserTab>
            <MenuList>
                {listMenu}
            </MenuList>
        </Wrapper>

    );
}