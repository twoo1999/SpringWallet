import styled from "styled-components";
import './../../common/fonts.css'
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    padding: 5rem;
    box-sizing: border-box;
`;

export function Preparing(){
    return(
        <Wrapper className="ExtraBold22">
            준비중 입니다.
        </Wrapper>
    )
}