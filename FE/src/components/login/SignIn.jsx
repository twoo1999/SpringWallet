import styled from "styled-components";
import '../../common/fonts.css'
import {ReactComponent as Google} from "../../assets/Google.svg";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10rem;
    align-items: center;
    gap: 5rem;
`;

const LoginBar = styled.div`
    background-color: #4285F4;
    width: 30rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    
    padding: 1rem 3rem;
    border-radius: 10px;
    cursor: pointer;
`;

const Span = styled.div`
    flex-grow: 1;
    text-align: center;
`;
const SignUpBar = styled.div`
    width: 30rem;
`;

const Sep = styled.div`
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 12px;
    
    
`;

const SignUp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;
`;

const SignUpIcons = styled.div`
    display: flex;
    justify-content: center;
`;
export function SignIn(){

    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID_GOOGLE;
    const handler = ()=>{
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID_GOOGLE}&redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT_URL}&response_type=code&scope=email profile`;
        // window.location.href = "/oauth2/authorization/google"
    }

    return (
        <Wrapper >
            <LoginBar onClick={handler}>
                <Google></Google>
                <Span className="Bold16 White">
                    구글로 로그인
                </Span>
            </LoginBar>
            {/*<SignUp>*/}
            {/*    <Sep className="Bold16">*/}
            {/*        회원가입*/}
            {/*    </Sep>*/}
            {/*    <SignUpBar>*/}
            {/*        <SignUpIcons>*/}
            {/*            <Google></Google>*/}
            {/*        </SignUpIcons>*/}

            {/*    </SignUpBar>*/}
            {/*</SignUp>*/}

        </Wrapper>
    );
}