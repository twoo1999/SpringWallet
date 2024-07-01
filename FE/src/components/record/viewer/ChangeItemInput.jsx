import styled from "styled-components";
import {useEffect, useState} from "react";
import ChangeDropdown from "./ChangeDropDown";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
const BorderlessInput = styled.input`
    border: none;
`;

export function ChangeItemInput({data, type, items, currData, onChangeValueReadonly}){

    const [view, setView] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        const value = ()=>{
            if (currData !== undefined) {
                return currData[`${type}Id`];
            }

            return data[0][`${type}`].id;
        }

        const val = items.find(item=> value() === item.id);

        if(val){
            setValue(val[`${type}_name`]);
        } else{
            if (currData[`${type}Id`] !== -1) {
                setValue("");
                onChangeValueReadonly(`${type}Id`, -1);

            }


        }
    }, [items]);



    const onSelect = (select)=>{
        onChangeValueReadonly(`${type}Id`, select);
        setView(!view);
    }


    return (
        <Wrapper>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput id={type} name={type} className="Bold16 Black" onClick={() => setView(!view)}
                             placeholder="선택하세요" value={value}
                             readOnly></BorderlessInput>
            {view && <ChangeDropdown type={type} items={items} onSelect={onSelect}></ChangeDropdown>}
        </Wrapper>
    );
}