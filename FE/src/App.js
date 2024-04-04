import './App.css';
import './common/color.css'
import {NavBar} from "./components/Nav/NavBar";
import styled from "styled-components";
import {Header} from "./components/header/Header";
import {Record} from "./components/record/Record";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const MainWrapper = styled.div`
    width: 100%;
`;

function App() {
    return (
        <Wrapper className="MainBG">
            <NavBar></NavBar>
            <MainWrapper>
                <Header></Header>
                <Record></Record>
            </MainWrapper>

        </Wrapper>
    );
}

export default App;
