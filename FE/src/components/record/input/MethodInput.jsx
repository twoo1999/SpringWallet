import {SelctInput} from "./SelctInput";
import {useEffect, useState} from "react";
import {getApi} from "../../../axiosIntercepter";

export function MethodInput({value, onChangeValueReadonly, items, renewItem}){
    const [method, setMethod] = useState([]);
    const filterData = (data)=>{
        if (data !== undefined) {
            return data.filter(d=>d.status === 'ACTIVE').map(d=>{
                return{
                    id: d.id,
                    name: d.method_name,
                }
            });
        }
    }
    useEffect(() => {
        setMethod(filterData(items));
    }, [items]);
    return(
        <>
            <SelctInput value={value} renewItem={renewItem} items={method} type="method" onChangeValueReadonly={onChangeValueReadonly} ></SelctInput>
        </>
    )
}