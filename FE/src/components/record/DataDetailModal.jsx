import styled from "styled-components";
import {CustomButton} from "./CustomButton";
import '../../common/color.css'
import {ItemInput} from "./ItemInput";
import {AmountInput} from "./AmoutInput";
import {SelctInput} from "./SelctInput";
import {DateInput} from "./DateInput";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
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
    background-color: white;
    border: none;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: 16px;
    border: 2px solid black;
`;
export function DataDetailModal({data}){
    const [currData, setCurrData] = useState(data[0]);
    const [change, setChange] = useState(false);
    // console.log(currData);

    const onChangeValue = (e)=>{
        setCurrData(prevState => {
            return {...prevState, [e.target.id]: e.target.value};
        });
    }
    const onChangeDateValue = (e)=>{
        setCurrData(prevState => {
            return {...prevState, [e.target.id]: e.target.value.split("-").map(x=>Number(x))};
        });
    }
    const onChangeValueReadonly = (key, value)=>{
        if(value){
            setCurrData((prevState) => {
                return {...prevState, [key]: value}
            });
        }

    }
    const [sign, setSign] = useState(data[0].amount >= 0 ? true : false);
    const [categories, setCategories] = useState();
    const isChanged = ()=>{
        const keys = Object.keys(data[0]);
        const diff = keys.filter(key => {
            if(key === 'timestamp'){
                return JSON.stringify(currData[key])  !== JSON.stringify(data[0][key]);
            } else{
                return data[0][key] !== currData[key]
            }

        });
        if(diff.length != 0){
            setChange(true);
        } else{
            setChange(false);
        }
    }

    useEffect(() => {
        isChanged();
    }, [currData, sign]);

    useEffect(() => {
        if (sign) {
            setCategories(["월급", "용돈", "행운(득)"]);
        } else {
            setCategories(["식비", "교통비", "취미", "카드값"])
        }


    }, [sign]);

    const updateButton = (e)=>{
        const updateData = {};
        const keys = Object.keys(data[0]);
        keys.forEach(key => {
            if (key === "id") {
                return;
            }
            if(key === 'timestamp'){
                if(JSON.stringify(currData[key])  !== JSON.stringify(data[0][key])){
                    updateData.timestamp = currData[key].map(x=>String(x).padStart(2, '0')).join("-");
                } else {
                    updateData.timestamp = null;
                }
            } else{
                if(data[0][key] !== currData[key]){
                    updateData[key] = currData[key];
                } else {
                    updateData[key] = null;
                }
            }

        });


        axios({
            method: "POST",
            url: `http://localhost:8080/record/${data[0].id}`,
            data: JSON.stringify(updateData),
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }

        })
        window.location.replace("/record");
        console.log(updateData);
    }
    const navigate = useNavigate();
    return(
        <Wrapper onClick={(e)=>e.stopPropagation()}>
            <DataWrapper>
                <ItemInput value={currData.item} onChangeValue={onChangeValue}></ItemInput>
                <AmountInput value={Math.abs(data[0].amount)} onChangeValueReadonly={onChangeValueReadonly} sign={sign}
                             onChangeSign={() => setSign(!sign)}></AmountInput>
                <SelctInput value={data[0].category} onChangeValueReadonly={onChangeValueReadonly} type="category"
                            items={categories}></SelctInput>
                <SelctInput value={data[0].method} onChangeValueReadonly={onChangeValueReadonly} type="method"
                            items={["카드", "현금"]}></SelctInput>
                <DateInput value={currData.timestamp} onChangeValue={onChangeDateValue}></DateInput>
            </DataWrapper>
            <MemoInput id="memo" onChange={onChangeValue} defaultValue={currData.memo}></MemoInput>
            <CustomButton bgColor={change ? "#299D91" : "#666666"} onClickBtn={updateButton} content={"수정"} disable={!change}></CustomButton>
        </Wrapper>
    )

}