import styled from "styled-components";
import Dropdown from "./Dropdown";
import {useState} from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
const BorderlessInput = styled.input`
    border: none;
`;

export function SelctInput({type, items}){
    const [view, setView] = useState(false);
    const [inputValue, setInputValue] = useState();
    return(
        <Wrapper>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput className="Bold16 Black" onClick={()=>{setView(!view)}} placeholder="선택하세요" value={inputValue} readOnly></BorderlessInput>
            {view && <Dropdown items={items} onSelect={(selected)=>{setInputValue(selected); setView(!view);}}></Dropdown>}
        </Wrapper>
    )
}
