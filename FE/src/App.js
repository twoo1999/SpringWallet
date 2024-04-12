import './App.css';
import './common/color.css'
import {NavBar} from "./components/Nav/NavBar";
import styled from "styled-components";
import {Header} from "./components/header/Header";
import {Record} from "./components/record/Record";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Loading} from "./components/login/loading";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const MainWrapper = styled.div`
    width: 100%;
`;

function App() {
    return (
        <BrowserRouter>
            <Wrapper className="MainBG">
                <NavBar></NavBar>
                <MainWrapper>
                    <Header></Header>
                    <Routes>
                        <Route path="/record/*" element={<Record></Record>}></Route>
                        <Route path="/login" element={<Login></Login>}></Route>
                        <Route path="/loading" element={<Loading/>}></Route>
                    </Routes>
                </MainWrapper>
            </Wrapper>
        </BrowserRouter>

    );
}

export default App;
