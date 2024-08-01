import './App.css';
import './common/color.css'
import {NavBar} from "./components/Nav/NavBar";
import styled from "styled-components";
import {Header} from "./components/header/Header";
import {Record} from "./components/record/Record";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignIn} from "./components/login/SignIn";
import {Loading} from "./components/login/loading";
import {CookiesProvider} from "react-cookie";
import {Preparing} from "./components/common/Preparing";
import {PrivateRoute} from "./components/common/PrivateRoute";
import {LoginButton} from "./components/login/LoginButton";
import {ErrorPage} from "./components/error/ErrorPage";

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
const NavWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #191919;
`;

const LoginWrapper = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    justify-content: end;
    box-sizing: border-box;
`;

function App() {
    return (
        <BrowserRouter>
            <CookiesProvider>
                <Wrapper >
                    <NavWrapper>

                        <NavBar></NavBar>
                    </NavWrapper>
                    <MainWrapper>
                        <Routes>
                            <Route path="/login" element={<SignIn></SignIn>}></Route>
                            <Route path="/loading" element={<Loading/>}></Route>
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={<div/>}></Route>
                                <Route path="/record/*" element={<Record></Record>}></Route>
                                <Route path="/overview" element={<Preparing/>}></Route>
                                <Route path="/fast-record" element={<Preparing/>}></Route>
                                <Route path="/AI" element={<Preparing/>}></Route>
                                <Route path="/goals" element={<Preparing/>}></Route>
                                <Route path="/setting" element={<Preparing/>}></Route>
                            </Route>
                            <Route path="/error" element={<ErrorPage/>}></Route>

                        </Routes>
                    </MainWrapper>
                </Wrapper>
            </CookiesProvider>
        </BrowserRouter>

    );
}

export default App;
