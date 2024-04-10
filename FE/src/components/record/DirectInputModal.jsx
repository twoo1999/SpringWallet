import {useRef} from "react";
import styled from "styled-components";


const Wrapper = styled.div`
    position: absolute;
    transform: translate(-18px);
    display: flex;
    flex-direction: column;
    background-color: #D1D1D1;
    padding: 16px 16px;
    gap: 8px;
    border-radius: 8px;
    width: 120px;
    box-sizing: border-box;
    
`;
const BorderlessInput = styled.input`
    border: none;
    border-radius: 4px;
`;


export function DirectInputModal({onSelect}){
    const inputRef = useRef(null);

    return (
        <Wrapper>
            <BorderlessInput type="text" ref={inputRef}/>
            <button onClick={()=>{onSelect(inputRef.current.value)}}>입력</button>
        </Wrapper>
    )

}