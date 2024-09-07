import {BorderlessInput, InputBlock} from "../../../common/commonStyle";
import {useState} from "react";
import {TypeDropdown} from "./TypeDropDown";

export function TypeInput(){
    const [dropView, setDropView] = useState(false);
    const onInputClick = ()=>{
        setDropView(!dropView);
    }

    return (
        <>
            <InputBlock>
                <span className="Regular12 Gray02">Type</span>
                <BorderlessInput id="timestamp" name="timestamp" className="Bold16 Black" placeholder="선택해주세요" readOnly={true} onClick={onInputClick}></BorderlessInput>
                {
                    dropView &&
                    <TypeDropdown></TypeDropdown>

                }

            </InputBlock>
        </>
    );
}