import './App.css';
import {NavBar} from "./components/Nav/NavBar";
import styled from "styled-components";
import {Header} from "./components/header/Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const MainWrapper = styled.div`
    width: 100%;
`;

function App() {
    return (
        <Wrapper>
            <NavBar></NavBar>
            <MainWrapper>
                <Header></Header>
            </MainWrapper>

        </Wrapper>
    );
}

export default App;
