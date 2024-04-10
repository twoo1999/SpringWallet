import styled from "styled-components";
import {useState} from "react";
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import {ReactComponent as Minus} from "../../assets/Minus.svg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
const AmountDiv = styled.div`
    width: 120px;
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


export function AmountInput({sign, onChangeSign}){
    // const [sign, setSign] = useState(true);
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Item</span>
            <AmountDiv>
                {sign ? <Plus onClick={() => {
                    onChangeSign(!sign);
                }}></Plus> : <Minus onClick={() => {
                    onChangeSign(!sign);
                }}></Minus>}
                <AmountSpan type="number" className="Bold16 Black" placeholder='0'></AmountSpan>
            </AmountDiv>
        </Wrapper>


    );
}