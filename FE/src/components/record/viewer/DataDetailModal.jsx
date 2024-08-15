import styled from "styled-components";
import {CustomButton} from "../CustomButton";
import '../../../common/color.css'
import {ItemInput} from "../input/ItemInput";
import {AmountInput} from "../input/AmoutInput";
import {DateInput} from "../input/DateInput";
import {useEffect, useState} from "react";
import {ChangeItemInput} from "./ChangeItemInput";
import {deleteApi, postApi} from "../../../axiosIntercepter";
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

const Btns = styled.div`
    display: flex;
    flex-direction: row;
    gap : 2rem;
`;


export function DataDetailModal({data, CM, R, closeDetailModalHandeler}){
    const [currData, setCurrData] = useState({...data[0], "categoryId":data[0].category.id, "methodId":data[0].method.id});
    const [change, setChange] = useState(false);


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


    useEffect(() => {
        const isChanged = ()=>{
            const keys = Object.keys(data[0]);

            if (currData.categoryId === -1) {
                setChange(false);
                return;
            }
            const diff = keys.filter(key => {
                if(key === 'timestamp'){
                    return JSON.stringify(currData[key])  !== JSON.stringify(data[0][key]);
                } else if(key === 'category' || key === 'method'){
                    return data[0][key].id !== currData[`${key}Id`];
                } else{
                    if (currData[key] === "") {
                        return false;
                    }
                    return data[0][key] !== currData[key];
                }

            });
            if(diff.length != 0){
                setChange(true);
            } else{
                setChange(false);
            }
        }

        isChanged();
    }, [currData]);


    const updateButton = async (e)=>{
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
            } else if (key === 'category' || key === 'method') {
               if(data[0][key].id !== currData[`${key}Id`]){
                   updateData[`${key}Id`] =  currData[`${key}Id`];
               }
            } else if (key === 'amount') {
                if(data[0][key] !== currData[key]){
                    updateData[key] = currData[key] ;
                } else{
                    updateData[key] = null;
                }
            } else {

                if (data[0][key] !== currData[key]) {
                    updateData[key] = currData[key];
                } else {
                    updateData[key] = null;
                }
            }

        });
        await postApi(`${process.env.REACT_APP_API_URL}/record/${data[0].id}`, JSON.stringify(updateData));

        await R.renewRecord();
        closeDetailModalHandeler();
    }
    const deleteButton = async (e)=>{
        await deleteApi(`${process.env.REACT_APP_API_URL}/record/${data[0].id}`)
        await R.renewRecord();
        closeDetailModalHandeler();
    }
    return(
        <Wrapper onClick={(e)=>e.stopPropagation()}>
            <DataWrapper>
                <ItemInput value={currData.item} onChangeValue={onChangeValue}></ItemInput>
                <AmountInput value={data[0].amount} onChangeValueReadonly={onChangeValueReadonly} sign={sign}
                             onChangeSign={() => setSign(!sign)}></AmountInput>
                <ChangeItemInput data={data} onChangeValueReadonly={onChangeValueReadonly} items={CM.category.filter(c=>c.status==='ACTIVE' && c.type === (sign ? "REVENUE" : "EXPENSE"))} type="category" currData={currData}></ChangeItemInput>
                <ChangeItemInput data={data} onChangeValueReadonly={onChangeValueReadonly} items={CM.method.filter(m=>m.status==='ACTIVE')} type="method" currData={currData}></ChangeItemInput>
                <DateInput value={currData.timestamp.map(x=>String(x).padStart(2, '0')).join("-")} onChangeValue={onChangeDateValue}></DateInput>
            </DataWrapper>
            <MemoInput id="memo" onChange={onChangeValue} defaultValue={currData.memo}></MemoInput>
            <Btns>
                <CustomButton bgColor={change ? "#299D91" : "#666666"} onClickBtn={updateButton} content={"수정"} disable={!change}></CustomButton>
                <CustomButton bgColor={"red"} onClickBtn={deleteButton} content={"삭제"}></CustomButton>
            </Btns>

        </Wrapper>
    )

}