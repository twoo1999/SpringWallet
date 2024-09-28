import styled from "styled-components";
import {IconButton, InputTable} from "../../../common/commonStyle";
import {ReactComponent as Analyze} from "../../../assets/Analyze.svg";
import {TypeInput} from "./TypeInput";
import {DateInput} from "./DateInput";
import {useEffect, useState} from "react";
import {postApi} from "../../../axiosIntercepter";


export function InputForm() {
    const initValue = {
        start: null,
        end: null,
        type: null,
    };
    const [data, setData] = useState(initValue);
    const [btnAble, setBtnAble] = useState(true);
    const setDataHandler = (key, val)=>{
        setData((prevState)=>{
            return {...prevState, [key]: val}
        });
    }

    useEffect(() => {
        const flag = Object.values(data).every(val => val != null);
        if(flag) setBtnAble(false)
        else setBtnAble(true);
        console.log(data)
    }, [data]);

    const clickPostBtnHandler = ()=>{
        if(new Date(data.start) > new Date(data.end)){
            alert("시작 날짜는 끝 날짜보다 앞서야 합니다. 다시 선택해 주세요.");
            return;
        }

        postApi(`${process.env.REACT_APP_API_URL}/ai/gemini`, data); //
        setData(initValue);


        // console.log(data);
        // post 버튼
    }




    return (
        <>
            <InputTable>
                <DateInput type='Start' value={data.start} setDataHandler={setDataHandler}></DateInput>
                <DateInput type='End' value={data.end} setDataHandler={setDataHandler}></DateInput>
                <TypeInput value={data.type} setDataHandler={setDataHandler}></TypeInput>
                <IconButton onClick={clickPostBtnHandler} disabled={btnAble}>
                    <Analyze fill={btnAble ? "lightgray" : "black"}></Analyze>
                </IconButton>
            </InputTable>
        </>
    )

}