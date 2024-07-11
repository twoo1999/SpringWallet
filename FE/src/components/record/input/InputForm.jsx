import {ItemInput} from "./ItemInput";
import {AmountInput} from "./AmoutInput";
import {DateInput} from "./DateInput";
import {ReactComponent as Report} from "../../../assets/Report.svg";
import {ReactComponent as Memo} from "../../../assets/memo.svg";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {InputBlock} from "./InputBlock";
import {MemoModal} from "../Memo";
import {CategoryInput} from "./CategoryInput";
import {MethodInput} from "./MethodInput";
import {postApi} from "../../../axiosIntercepter";

const RecordTable = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 16px;
    justify-content: space-between;
    border-radius: 16px;
    padding : 30px 64px; 
    align-items: center;
    border: 2px solid #666666;
`;
const ModalBack = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        
    `;
export function InputForm({CM, R}){
    const defaultValue = {
        item: "",
        amount: "",
        categoryId: "",
        methodId: "",
        timestamp:new Date().toISOString().split('T')[0]
    }
    const inputBlock = [];
    const [sign, setSign] = useState(true);
    const [input, setInput] = useState(defaultValue);
    const [memoValue, setMemoValue] = useState("");
    const [able, setAble] = useState(true);
    const [memoView, setMemoView] = useState(false);
    useEffect(() => {

        const emptyList = Object.keys(input).filter(key=>{
            if(key === 'amount'){
                return input[key] === 0;
            } else{
                return input[key].length === 0;
            }
        })
        setAble(emptyList.length !== 0);
      }, [input]);


    for(let i = 0; i < 5; i++){
        inputBlock.push(<InputBlock num={i}></InputBlock>)
    }

    const onChangeValue = (e)=>{

        setInput((prevState) => {
            return {...prevState, [e.target.id]: e.target.value}
        });
    }
    const onChangeValueReadonly = (key, value)=>{

        if(value !== undefined){
            setInput((prevState) => {
                return {...prevState, [key]: value}
            });
        }



    }
    const onChangeMemoValue = (e)=>{
        setMemoValue(e.target.value);
    }


    const closeMemoModalHandeler = ()=>{
        setMemoView(!memoView);
    }



    const onClickPostBtn = async (e)=>{
        e.preventDefault();
        await postApi(`${process.env.REACT_APP_BASE_URL}/record`, JSON.stringify({
            ...input,
            memo: memoValue.length > 0 ? memoValue : ""
        }));

        await R.renewRecord();

        setInput(defaultValue);
        setMemoValue("")

    }
    return (
        <>
            <form>
                <RecordTable className="White">
                    <ItemInput value={input.item} onChangeValue={onChangeValue}></ItemInput>
                    <AmountInput value={input.amount} onChangeValueReadonly={onChangeValueReadonly} sign={sign}
                                 onChangeSign={() => {setSign(!sign); onChangeValueReadonly("categoryId", "")}}></AmountInput>
                    <CategoryInput value={input.categoryId} items={CM.category} renewItem={CM.renewCategory} onChangeValueReadonly={onChangeValueReadonly} sign={sign}></CategoryInput>
                    <MethodInput value={input.methodId} items={CM.method} renewItem={CM.renewMethod} onChangeValueReadonly={onChangeValueReadonly}></MethodInput>
                    <DateInput value={input.timestamp} onChangeValue={onChangeValue}></DateInput>
                    <Memo onClick={() => {
                        setMemoView(!memoView)
                    }}></Memo>
                    <button disabled={able} onClick={onClickPostBtn}><Report></Report></button>


                </RecordTable>
            </form>
            {
                memoView &&
                <ModalBack onClick={closeMemoModalHandeler}>
                    <MemoModal memoValue={memoValue} onChangeValue={onChangeMemoValue} onClickCloseBtn={closeMemoModalHandeler}></MemoModal>
                </ModalBack>
            }
        </>

    )

}
