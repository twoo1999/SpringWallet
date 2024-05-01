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
    height : 100%;
    width: 100%;
`;

const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
const NavW = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;


function App() {
    return (
        <BrowserRouter>
            <Wrapper >
                <NavW>
                    <NavBar></NavBar>
                </NavW>

                <MainWrapper>
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
