import styled from "styled-components";
import {BorderlessInput, InputBlock} from "../../../common/commonStyle";


export function DateInput({type}){
    return (
        <InputBlock>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput id="timestamp" name="timestamp"  type='date' className="Bold16 Black" ></BorderlessInput>
        </InputBlock>


    );
}

