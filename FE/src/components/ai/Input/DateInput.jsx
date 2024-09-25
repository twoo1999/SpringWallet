import styled from "styled-components";
import {BorderlessInput, InputBlock} from "../../../common/commonStyle";


export function DateInput({type, setDataHandler, value}){
    return (
        <InputBlock>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput id="timestamp" name={type} type='date' className="Bold16 Black"
                             onChange={(e) => !setDataHandler || setDataHandler(type.toLowerCase(), e.target.value)}
                             value={value||""}>
            </BorderlessInput>

        </InputBlock>


    );
}

