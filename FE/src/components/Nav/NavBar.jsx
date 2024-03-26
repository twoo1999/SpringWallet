import {ReactComponent as Logo} from "../../assets/Logo.svg";
import "./Nav.css";
import {NavButton} from "./NavButton";
import styled from "styled-components";
import {UserInfo} from "./UserInfo";
import {useState} from "react";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 48px 28px;
    height: 100vh;
    width: 280px;
    box-sizing: border-box;
    background-color: #191919;
    justify-content: space-between;
    
`;
const MenuLogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:40px;
`;


const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;
const MenuList = styled.div`
    width: 224px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
export function NavBar() {
    const [number, setNumber] = useState(0);
    const listMenu = [];
    for (let i = 0; i < 6; i++) {
        const bColor = number === i ? '#299D91' : '#191919';
        listMenu.push(<NavButton bColor={bColor} num={i}></NavButton>);
    }
    // const listMenu = menu.map(x=><NavButton str={x}></NavButton>);
    return (
        <Wrapper>
            <MenuLogoWrapper>
                <Logo></Logo>
                <MenuList>
                    {listMenu}
                </MenuList>
            </MenuLogoWrapper>
            <UserInfoWrapper>
                <NavButton bColor='#525256' num={6}></NavButton>
                <UserInfo></UserInfo>
            </UserInfoWrapper>

        </Wrapper>

    );
}