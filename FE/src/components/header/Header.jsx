import styled from "styled-components";
import '../../common/fonts.css'
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 20px 24px;
    box-sizing: border-box;
    gap: 24px;
    border-bottom: 1px solid gray;
`;

export function Header(){
    const name = "Tanzir";
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentTime.getDate()).padStart(2, '0');
    return(
        <Wrapper>
            <span className="Bold24">Hello {name}</span>
            <span className="Regular14">{year}년 {month}월 {day}일</span>
        </Wrapper>
    );
}