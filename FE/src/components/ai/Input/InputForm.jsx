import styled from "styled-components";
import {IconButton, InputTable} from "../../../common/commonStyle";
import {DateInput} from "./DateInput";
import {ReactComponent as Analyze} from "../../../assets/Analyze.svg";
import {TypeInput} from "./TypeInput";


export function InputForm(){
    return (
        <>
            <InputTable>
                <DateInput type='Start'></DateInput>
                <DateInput type='End'></DateInput>
                <TypeInput ></TypeInput>
                <IconButton>
                    <Analyze></Analyze>
                </IconButton>
            </InputTable>
        </>
    )

}