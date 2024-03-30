import styled from "styled-components";
import '../../common/fonts.css'
import '../../common/color.css'
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import {useState} from "react";
import Dropdown from "./Dropdown";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;

const AmountDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    gap:10px;
`;

const AmountSpan = styled.input`
    width: 100%;
    text-align: end;
    border: none;
`;

const BorderlessInput = styled.input`
    border: none;
`;


export function InputBlock({num}){
    const [inputValue, setInputValue] = useState();
    const types = ["Item", "Amount", "Category", "Payment Method", "Date"];
    const [view, setView] = useState(false);
    let input = <BorderlessInput className="Bold16 Black" onClick={()=>{setView(!view)}} placeholder="선택하세요" value={inputValue} readOnly></BorderlessInput>;

    if (num === 0) {
        input = <BorderlessInput type='text' className="Bold16 Black" placeholder="입력하세요" ></BorderlessInput>;
    } else if (num == 1) {
        input = <AmountDiv>
            <Plus></Plus>
            <AmountSpan type="number" className="Bold16 Black" placeholder='0'></AmountSpan>
        </AmountDiv>;
    } else if (num == 4) {
        input = <BorderlessInput type='date' className="Bold16 Black"  ></BorderlessInput>;
    }
    return(
        <Wrapper>
            <span className="Regular12 Gray02">{types[num]}</span>
            {input}
            {view && <Dropdown items={num===2 ? ["카드값", "식비", "교통비", "취미"] : ["카드", "현금"]} onSelect={(selected)=>{setInputValue(selected); setView(!view);}}></Dropdown>}

        </Wrapper>
    );
}