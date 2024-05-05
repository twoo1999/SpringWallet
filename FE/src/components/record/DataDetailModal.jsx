import styled from "styled-components";
import {CustomButton} from "./CustomButton";
import '../../common/color.css'
import {ItemInput} from "./ItemInput";
import {AmountInput} from "./AmoutInput";
import {SelctInput} from "./SelctInput";
import {DateInput} from "./DateInput";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5rem;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;
    border-radius: 16px;
    width: 70rem;
`;
const DataWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const MemoInput = styled.textarea`
    width: 100%;
    height: 400px;
    resize: none;
    background-color: #D1D1D1;
    border: none;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: 16px;
`;
export function DataDetailModal({data}){
    const onChangeValue = (e)=>{

    }
    const onChangeValueReadonly = (key, value)=>{

    }
    const [sign, setSign] = useState(true);
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    return(
        <Wrapper onClick={(e)=>e.stopPropagation()}>
            <DataWrapper>
                <ItemInput onChangeValue={onChangeValue}></ItemInput>
                <AmountInput onChangeValueReadonly={onChangeValueReadonly} sign={sign}
                             onChangeSign={() => setSign(!sign)}></AmountInput>
                <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="category"
                            items={categories}></SelctInput>
                <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="method"
                            items={["카드", "현금"]}></SelctInput>
                <DateInput onChangeValue={onChangeValue}></DateInput>
            </DataWrapper>
            <MemoInput></MemoInput>
        </Wrapper>
    )

}