import styled from "styled-components";
import {BorderlessInput, InputBlock} from "../../../common/commonStyle";


export function DateInput({type, setDataHandler}){
    return (
        <InputBlock>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput id="timestamp" name={type}  type='date' className="Bold16 Black" onChange={(e)=>setDataHandler(type, e.target.value)}></BorderlessInput>
        </InputBlock>


    );
}

