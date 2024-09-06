import styled from "styled-components";
import {IconButton, InputTable} from "../../common/commonStyle";
import {DateInput} from "./DateInput";
import {ReactComponent as Analyze} from "../../assets/Analyze.svg";


export function InputForm(){
    return (
        <>
            <InputTable>
                <DateInput type='Start'></DateInput>
                <DateInput type='End'></DateInput>
                <IconButton>
                    <Analyze></Analyze>
                </IconButton>
            </InputTable>
        </>
    )

}