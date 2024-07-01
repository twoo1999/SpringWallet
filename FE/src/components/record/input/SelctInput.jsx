import styled from "styled-components";
import Dropdown from "./Dropdown";
import {useEffect, useState} from "react";
import {CategorySettingModal} from "../category/CategorySettingModal";
import {deleteApi, postApi} from "../../../axiosIntercepter";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
const BorderlessInput = styled.input`
    border: none;
`;
const ModalBack = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
`;







export function SelctInput({renewItem, items, type, onChangeValueReadonly, sign, value}){
    const [view, setView] = useState(false);
    const [modalView, setModalView] = useState(false);

    const [selectedItem, setSelectedItem] = useState();
    const [inputItem, setInputItem] = useState();
    const [newItem, setNewItem] = useState([]);
    const [deleteItem, setDeleteItem] = useState([]);
    const [selected, setSelected] = useState("");
    const onItemInputChange = (e)=>{
        setInputItem(e.target.value);
    }
    const onPlusClick = (e) => {
        if (inputItem === undefined || inputItem.length === 0) {
            return;
        }
        if (deleteItem.map(di=>di.name).includes(inputItem)) {
            setDeleteItem(deleteItem.filter(di=>di.name !== inputItem));
            return;
        }
        const newItems = items.map(item=>item.name).concat(newItem);

        if (!newItems.includes(inputItem)) {
            const n = newItem.slice();
            n.push(inputItem);
            setNewItem(n);
        }
    };
    const onMinusClick = (e) =>{
        const name = e.currentTarget.getAttribute("name");
        const id = e.currentTarget.getAttribute("id");
        if (newItem.includes(name)) {
            setNewItem(newItem.filter(x=>x !== name));
            return;
        }
        // const n = deleteItem.slice();
        const arr = deleteItem.slice();
        arr.push({id, name});

        setDeleteItem(arr);
    }

    const onSettingClick = ()=>{
        setModalView(!modalView);
    }
    const closeCategorySettingModalHandeler = (e)=>{
        e.preventDefault();
        setDeleteItem([]);
        setNewItem([]);
        setInputItem();
        setModalView(!modalView);
    }
    const onSaveBtnClick = async (e)=>{
        e.preventDefault();
        if (deleteItem.length === 0 && newItem.length === 0) {
            return;
        }
        setSelected("")
        setDeleteItem([]);
        setNewItem([]);
        setInputItem();
        if(type === "category"){
            const data = {
                "name": newItem,
                "type": sign ? "revenue" : "expense"
            }
            await postApi(`${process.env.REACT_APP_BASE_URL}/${type}`, JSON.stringify(data));

        } else{
            const data = {
                "name": newItem,
            }
            await postApi(`${process.env.REACT_APP_BASE_URL}/${type}`, JSON.stringify(data));
        }

        await deleteApi(`${process.env.REACT_APP_BASE_URL}/${type}`, {"ids":deleteItem.map(item=>item.id)});
        renewItem();
        setModalView(!modalView);
    }


    useEffect(() => {
        if (value) {
            setSelected(items.filter(i=>{return value === i.id})[0].name);
        } else{
            setSelected("")
        }

    }, [value]);
    return (
        <Wrapper>
            <span className="Regular12 Gray02">{type}</span>
            <BorderlessInput id={type} name={type} className="Bold16 Black" onClick={() => {
                setView(!view)
            }} placeholder="선택하세요" value={selected} readOnly></BorderlessInput>
            {view && <Dropdown onSettingClick={onSettingClick} items={items} onSelect={(select) => {
                onChangeValueReadonly(`${type}Id`, select);
                setView(!view);
            }}></Dropdown>}


            {
                modalView &&
                <ModalBack onClick={closeCategorySettingModalHandeler}>
                    <CategorySettingModal onCancleBtnClick={closeCategorySettingModalHandeler}
                                          onSaveBtnClick={onSaveBtnClick} onItemInputChange={onItemInputChange}
                                          items={items} deleteItem={deleteItem} newItem={newItem}
                                          onPlusClick={onPlusClick} onMinusClick={onMinusClick}></CategorySettingModal>
                </ModalBack>
            }
        </Wrapper>
    );
}
