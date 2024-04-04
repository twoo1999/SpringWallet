import '../../common/fonts.css'
import '../../common/color.css'
import styled from "styled-components";
import {InputBlock} from "./InputBlock";
import {ReactComponent as Report} from "../../assets/Report.svg";
import {ReactComponent as Memo} from "../../assets/memo.svg";
import {ItemInput} from "./ItemInput";
import {AmountInput} from "./AmoutInput";
import {SelctInput} from "./SelctInput";
import {DateInput} from "./DateInput";
import {useEffect, useState} from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 24px;
    gap: 10px;
`;

const RecordTable = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 16px;
    justify-content: space-between;
    border-radius: 16px;
    padding : 30px 64px; 
    align-items: center;
`;

/* TODzo
*
*
 */
export function Record(){
    const inputBlock = [];
    const [categories, setCategories] = useState();
    const [sign, setSign] = useState(true);
    useEffect(() => {
        console.log(sign)
        if (sign) {
            setCategories(["월급", "용돈", "행운(득)"]);
        } else {
            setCategories(["식비", "교통비", "취미", "카드값"])
        }

    }, [sign]);
    for(let i = 0; i < 5; i++){
        inputBlock.push(<InputBlock num={i}></InputBlock>)
    }
    return (
        <Wrapper>
            <span className="Header22 Gray01">Record</span>
            <RecordTable className="White">
                <ItemInput></ItemInput>
                <AmountInput sign={sign} onChangeSign={()=>setSign(!sign)}></AmountInput>
                <SelctInput type="Category" items={categories}></SelctInput>
                <SelctInput type="Payment Method" items={["카드", "현금"]}></SelctInput>
                <DateInput></DateInput>
                <Memo></Memo>
                <Report></Report>
            </RecordTable>
        </Wrapper>
    )
}