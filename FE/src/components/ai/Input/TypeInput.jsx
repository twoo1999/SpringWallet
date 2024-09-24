import {BorderlessInput, InputBlock, ModalBack} from "../../../common/commonStyle";
import {useEffect, useRef, useState} from "react";
import {TypeDropdown} from "./TypeDropDown";

export function TypeInput({value, setDataHandler}){
    const [dropView, setDropView] = useState(false);
    // const [type, setType] = useState("");
    const menuRef = useRef();
    const onInputClick = ()=>{
        setDropView(!dropView);
    }
    const selectTypeHandler = (item)=>{
        // setType(item);
        setDataHandler("type", item);
        setDropView(!dropView);
    }
    useEffect(() => {
        function handleClickOutside(e){
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setDropView(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);
    return (
        <>
            <InputBlock ref={menuRef}>
                <span className="Regular12 Gray02">Type</span>
                <BorderlessInput id="timestamp" name="timestamp" className="Bold16 Black" placeholder="선택해주세요" readOnly={true} onClick={onInputClick} value={value||""}></BorderlessInput>
                {
                    dropView &&
                    <TypeDropdown selectTypeHandler={selectTypeHandler}></TypeDropdown>
                }

            </InputBlock>
        </>
    );
}