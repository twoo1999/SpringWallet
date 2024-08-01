import {SelctInput} from "./SelctInput";
import {useEffect, useState} from "react";

export function CategoryInput({value, sign, onChangeValueReadonly, items, renewItem}){
    // const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        const filterData = (data)=>{
            if (data !== undefined) {
                return data.filter(d=>d.type === (sign? "REVENUE" : "EXPENSE") && d.status === 'ACTIVE').map(d=>{
                    return {
                        id: d.id,
                        name: d.category_name,
                    }
                });
            } else{
                return [];
            }

        }
        setCategory(filterData(items));
    }, [items, sign]);


    return(
        <>
            <SelctInput value={value} renewItem={renewItem} items={category} type="category" onChangeValueReadonly={onChangeValueReadonly} sign={sign} ></SelctInput>
        </>

    )
}