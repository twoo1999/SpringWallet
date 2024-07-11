import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10rem;
    align-items: center;
    gap: 5rem;
`;
export function ErrorPage(){
    return(
        <Wrapper>
            <span className="ExtraBold22">
                죄송합니다. 서버에 오류가 발생했네요... 빠른 시일 내에 복구하겠습니다...
            </span>
        </Wrapper>
    )
}