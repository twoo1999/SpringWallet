import styled from "styled-components";
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
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    border-radius: 16px;
    width: 700px;
`;


const MemoInput = styled.textarea`
    width: 100%;
    height: 400px;
    resize: none;
    background-color: white;
    border: none;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 2px solid black;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
`;

export function MemoModal({onClickCloseBtn, memoValue, onChangeValue}) {
    return (
        <Wrapper onClick={(e)=>e.stopPropagation()}>
            <MemoInput onChange={onChangeValue} className="Regular16" name="memo" defaultValue={memoValue}></MemoInput>
            <BtnWrapper>
                <CustomButton onClickBtn={onClickCloseBtn} content="기록" bgColor="#299D91"></CustomButton>

            </BtnWrapper>
        </Wrapper>
    )
}