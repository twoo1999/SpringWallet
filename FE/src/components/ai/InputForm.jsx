import styled from "styled-components";
import {InputTable} from "../../common/commonStyle";
import {DateInput} from "./DateInput";

export function InputForm(){
    return (
        <>
            <InputTable>
                <DateInput type='Start'></DateInput>
                <DateInput type='End'></DateInput>
                <div>
                    report
                </div>
            </InputTable>
        </>
    )

}