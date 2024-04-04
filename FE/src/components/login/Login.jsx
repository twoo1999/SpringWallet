import styled from "styled-components";

const Wrapper = styled.div`
    width: 100px;
    height: 100px;
`;
export function Login(){
    const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID_GOOGLE;
    const handler = ()=>{
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID_GOOGLE}&redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT_URL}&response_type=code&scope=email profile`;
    }

    return (
        <Wrapper onClick={handler}>
            구글 로그인
        </Wrapper>
    );
}