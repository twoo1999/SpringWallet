import styled from "styled-components";
import {useEffect, useState} from "react";
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

const AmountP = styled.input`
    width: 100%;
    text-align: end;
    border: none;
`;


export function AmountInput({value, sign, onChangeSign, onChangeValueReadonly}){
    const [val, setVal] = useState(value);


    useEffect(() => {
        onChangeValueReadonly("amount", sign ? val : val * -1);
    }, [sign, val]);
    const changeHandler = (e)=>{
        setVal(e.target.value);
    }
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Item</span>
            <AmountDiv>
                {sign ? <Plus onClick={() => {
                    onChangeSign(!sign);
                }}></Plus> : <Minus onClick={() => {
                    onChangeSign(!sign);
                }}></Minus>}
                {/*<AmountP defaultValue="10" id="fakeAmount" type="number" className="Bold16 Black" placeholder='0' value={val} onChange={changeHandler}></AmountP>*/}
                <AmountP defaultValue={value ? value : "0"} id="fakeAmount" type="number" className="Bold16 Black" placeholder='0' onChange={changeHandler}></AmountP>
            </AmountDiv>
        </Wrapper>


    );
}