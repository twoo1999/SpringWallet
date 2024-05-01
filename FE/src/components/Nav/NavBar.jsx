import {ReactComponent as Logo} from "../../assets/Logo.svg";
import "./Nav.css";
import {NavButton} from "./NavButton";
import styled from "styled-components";
import {UserInfo} from "./UserInfo";
import {useState} from "react";

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
    const [number, setNumber] = useState(0);
    const listMenu = [];
    for (let i = 0; i < 6; i++) {
        const bColor = number === i ? '#299D91' : '#191919';
        listMenu.push(<NavButton bColor={bColor} num={i}></NavButton>);
    }
    // const listMenu = menu.map(x=><NavButton str={x}></NavButton>);
    return (
        <Wrapper>
            <LogoAndUserTab>
                <Logo></Logo>
            </LogoAndUserTab>
            <MenuList>
                {listMenu}
            </MenuList>
            {/*<MenuLogoWrapper>*/}
            {/*    <Logo></Logo>*/}
            {/*    /!*<MenuList>*!/*/}
            {/*    /!*    {listMenu}*!/*/}
            {/*    /!*</MenuList>*!/*/}
            {/*</MenuLogoWrapper>*/}
            {/*<UserInfoWrapper>*/}
            {/*    <NavButton bColor='#525256' num={6}></NavButton>*/}
            {/*    <UserInfo></UserInfo>*/}
            {/*</UserInfoWrapper>*/}

        </Wrapper>

    );
}