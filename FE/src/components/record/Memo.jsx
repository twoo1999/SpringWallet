import styled from "styled-components";
import {ItemInput} from "./ItemInput";
import {AmountInput} from "./AmoutInput";
import {SelctInput} from "./SelctInput";
import {DateInput} from "./DateInput";
import {CustomButton} from "./CustomButton";
import '../../common/color.css'
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 16px;
    height: 550px;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px;
`;


const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;

const InputBar = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    width: 650px;
    box-sizing: border-box;
    justify-content: space-between;
`;

const BorderlessInput = styled.input`
    border: none;
`;

const MemoInput = styled.textarea`
    width: 100%;
    height: 400px;
    resize: none;
    background-color: #D1D1D1;
    border: none;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
`;
export function MemoModal({onChangeValue, onChangeValueReadonly, sign,onClick, input, categories}) {
    return (
        <Wrapper onClick={onClick}>
            <InputBar>
                <ItemInput onChangeValue={onChangeValue}></ItemInput>
                <AmountInput></AmountInput>
                <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="category" items={categories}></SelctInput>
                <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="method" items={["카드", "현금"]}></SelctInput>
                <DateInput onChangeValue={onChangeValue}></DateInput>
            </InputBar>
            <MemoInput cols="5" ></MemoInput>
            <BtnWrapper>
                <CustomButton content="기록" bgColor="#299D91"></CustomButton>
                <CustomButton content="닫기" bgColor="#525256"></CustomButton>
            </BtnWrapper>
            
            


        </Wrapper>
    )
}