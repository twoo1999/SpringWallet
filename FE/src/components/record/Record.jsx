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
import axios from "axios";
import {MemoModal} from "./Memo";
import {RecordViewer} from "./RecordViewer";

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

const ModalBack = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        
    `;
export function Record(){
    const inputBlock = [];
    const [categories, setCategories] = useState();
    const [sign, setSign] = useState(true);
    const [input, setInput] = useState({
        item: "",
        amount: "",
        category: "",
        method: "",
        timestamp:new Date().toISOString().split('T')[0]
    });
    const [memoValue, setMemoValue] = useState("");
    const [able, setAble] = useState(true);
    const [memoView, setMemoView] = useState(false);
    useEffect(() => {
        if (sign) {
            setCategories(["월급", "용돈", "행운(득)"]);
        } else {
            setCategories(["식비", "교통비", "취미", "카드값"])
        }


    }, [sign]);

    useEffect(() => {
        const flag = !Object.values(input).every(val => val.length > 0);
        setAble(flag);
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
        if(value){
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


    return (
        <Wrapper>
            <span className="Header22 Gray01">Record</span>
            <form action="http://localhost:8080/record" method="post">
                <RecordTable className="White">
                    <ItemInput onChangeValue={onChangeValue}></ItemInput>
                    <AmountInput onChangeValueReadonly={onChangeValueReadonly} sign={sign}
                                 onChangeSign={() => setSign(!sign)}></AmountInput>
                    <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="category"
                                items={categories}></SelctInput>
                    <SelctInput onChangeValueReadonly={onChangeValueReadonly} type="method"
                                items={["카드", "현금"]}></SelctInput>
                    <DateInput onChangeValue={onChangeValue}></DateInput>
                    <Memo onClick={() => {
                        setMemoView(!memoView)
                    }}></Memo>
                    <button disabled={able} onClick={(e) => {
                        e.preventDefault();
                        const amount = Number(input.amount);
                        axios({
                            method: "POST",
                            url: "http://localhost:8080/record",
                            data: JSON.stringify({
                                ...input,
                                amount: sign ? amount : -1 * amount,
                                memo: memoValue.length > 0 ? memoValue : null
                            }),
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json"
                            }

                        }).then((res, err) => {
                            console.log(res);
                        })
                    }}><Report></Report></button>


                </RecordTable>
            </form>
            {
                memoView &&
                <ModalBack onClick={closeMemoModalHandeler}>
                    <MemoModal memoValue={memoValue} onChangeValue={onChangeMemoValue}
                               onClickCloseBtn={closeMemoModalHandeler}></MemoModal>
                </ModalBack>
            }

            <span className="Header22 Gray01">Transaction</span>
            <RecordViewer></RecordViewer>

        </Wrapper>
    )
}