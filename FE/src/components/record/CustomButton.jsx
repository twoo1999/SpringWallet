import styled from "styled-components";

const RecordBtn = styled.button`
    width: 100px;
    height: 34px;
    background-color: ${props=>props.bgColor};
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
`;

export function CustomButton({content, bgColor, onClickBtn}){
    return(
        <RecordBtn onClick={onClickBtn} bgColor={bgColor}>{content}</RecordBtn>
    )
}
