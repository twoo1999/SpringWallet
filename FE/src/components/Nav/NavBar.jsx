import {ReactComponent as Logo} from "../../assets/Logo.svg";
import "./Nav.css";
import {NavButton} from "./NavButton";
import styled from "styled-components";
import {UserInfo} from "./UserInfo";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {LoginButton} from "../login/LoginButton";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    
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
    justify-content: space-between;
`;

export function NavBar() {
    const listMenu = [];
    const strs = ["한 눈에 보기", "기록", "빠른 기록", "AI 분석", "목표", "로그인"];
    const paths = ["/overview", "/record", "/fast-record", "/AI", "/goals"];
    for (let i = 0; i < 5; i++) {
        listMenu.push(<NavButton key={i} path={paths[i]} content={strs[i]}></NavButton>);
    }

    return (
        <Wrapper>
            <LoginButton></LoginButton>
            <LogoAndUserTab>
                <Logo></Logo>
            </LogoAndUserTab>
            <MenuList>
                {listMenu}
            </MenuList>
        </Wrapper>

    );
}