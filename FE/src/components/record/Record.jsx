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
const MemoInput = styled.input`
    display: none;
`;


/* TODzo
*
*
*/
export function Record(){
    const inputBlock = [];
    const [categories, setCategories] = useState();
    const [sign, setSign] = useState(true);
    const [input, setInput] = useState({
        item: false,
        fakeAmount: false,
        category: false,
        method: false
    });
    const [able, setAble] = useState(true);
    useEffect(() => {
        if (sign) {
            setCategories(["월급", "용돈", "행운(득)"]);
        } else {
            setCategories(["식비", "교통비", "취미", "카드값"])
        }


    }, [sign]);

    useEffect(() => {
        const flag = !Object.values(input).every(val => val === true);
        setAble(flag);
      }, [input]);


    for(let i = 0; i < 5; i++){
        inputBlock.push(<InputBlock num={i}></InputBlock>)
    }

    const onChangeValue = (e)=>{
        setInput((prevState) => {
            return {...prevState, [e.target.id]: e.target.value.length > 0}
        });
    }
    const onChangeValueReadonly = (key, value)=>{
        if(value){
            setInput((prevState) => {
                return {...prevState, [key]: value.length > 0}
            });
        }

    }

    return (
        <Wrapper>
            <span className="Header22 Gray01">Record</span>
            <form action="http://localhost:8080/record" method="post">
                <RecordTable className="White">
                    <ItemInput onChangeValue={onChangeValue}></ItemInput>
                    <AmountInput onChangeValue={onChangeValue} sign={sign} onChangeSign={()=>setSign(!sign)}></AmountInput>
                    <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="category" items={categories}></SelctInput>
                    <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="method" items={["카드", "현금"]}></SelctInput>
                    <DateInput onChangeValue={onChangeValue}></DateInput>
                    <Memo></Memo>
                    <MemoInput id="momo" name="memo" value={null}></MemoInput>
                    <button disabled={able}><Report></Report></button>

                </RecordTable>
            </form>

        </Wrapper>
    )
}