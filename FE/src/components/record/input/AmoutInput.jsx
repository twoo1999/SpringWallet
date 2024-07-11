import styled from "styled-components";
import {ReactComponent as Plus} from "../../../assets/Plus.svg";
import {ReactComponent as Minus} from "../../../assets/Minus.svg";
import {useEffect, useState} from "react";

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

const AmountP = styled.input`
    width: 100%;
    text-align: end;
    border: none;
`;


export function AmountInput({value, sign, onChangeSign, onChangeValueReadonly}){

    const [val, setVal] = useState(value);

    useEffect(() => {
        onChangeValueReadonly("amount", val);
    }, [val]);

    useEffect(() => {
        const v = Math.abs(val);
        setVal(sign ? v : v * -1);
    }, [sign]);

    const changeHandler = (e)=>{
        // const val = e.target.value;
        const v = e.target.value;
        setVal(sign ? v : v * -1);
        // onChangeValueReadonly("amount", val);
    }
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Amount</span>
            <AmountDiv>
                {sign ? <Plus onClick={(e) => {
                    onChangeSign(!sign);
                }}></Plus> : <Minus onClick={(e) => {
                    onChangeSign(!sign);
                }}></Minus>}
                <AmountP min='0' value={Math.abs(value)} id="amount" type="number" className="Bold16 Black" placeholder='0' onChange={changeHandler}></AmountP>
            </AmountDiv>
        </Wrapper>


    );
}