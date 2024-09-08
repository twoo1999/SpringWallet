import styled from "styled-components";
import {IconButton, InputTable} from "../../../common/commonStyle";
import {ReactComponent as Analyze} from "../../../assets/Analyze.svg";
import {TypeInput} from "./TypeInput";
import {DateInput} from "./DateInput";
import {useEffect, useState} from "react";


export function InputForm() {
    const [data, setData] = useState({
        start: null,
        end: null,
        type: null,
    });

    const setDataHandler = (key, val)=>{
        setData((prevState)=>{
            return {...prevState, [key]: val}
        });
        console.log(data);

    }

    const [btnAble, setBtnAble] = useState(true);

    useEffect(() => {
        const flag = Object.values(data).every(val => val != null);
        if(flag) setBtnAble(false)
        else setBtnAble(true);

    }, [btnAble]);


    return (
        <>
            <InputTable>
                <DateInput type='start' setDataHandler={setDataHandler}></DateInput>
                <DateInput type='end' setDataHandler={setDataHandler}></DateInput>
                <TypeInput setDataHandler={setDataHandler}></TypeInput>
                <IconButton disabled={btnAble}>
                    <Analyze fill={btnAble ? "lightgray" : "black"}></Analyze>
                </IconButton>
            </InputTable>
        </>
    )

}