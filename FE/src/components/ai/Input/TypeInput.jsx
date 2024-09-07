import {BorderlessInput, InputBlock} from "../../../common/commonStyle";
import {useState} from "react";

export function TypeInput(){
    const [modalView, setModalView] = useState(false);
    return (
        <>
            <InputBlock>
                <span className="Regular12 Gray02">Type</span>
                <BorderlessInput id="timestamp" name="timestamp" className="Bold16 Black" placeholder="선택해주세요" readOnly={true}></BorderlessInput>
                {
                    view
                }

            </InputBlock>
        </>
    );
}