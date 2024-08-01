import styled from "styled-components";

const RecordBtn = styled.button`
    width: 100px;
    height: 34px;
    background-color: ${props=>props.$bgColor};
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
`;

export function CustomButton({content, bgColor, onClickBtn, disable}){
    return(
        <RecordBtn onClick={onClickBtn} $bgColor={bgColor} disabled={disable ? disable: false}>{content}</RecordBtn>
    )
}
