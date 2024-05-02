import styled from "styled-components";
import {RecordHeader} from "./RecordHeader";
import {RecordList} from "./RecordList";
import {useEffect, useState} from "react";
import axios from "axios";
import {DateSelector} from "./DateSelector";
import {TypeButton} from "./TypeButton";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:1rem
`;

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #666666;
`;

const TypeBtns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
`;
export function RecordViewer(){

    const [list, setList] = useState([]);
    const getData = async()=>{
        // await axios({
        //     method: "GET",
        //     url: `http://localhost:8080/record`,
        //     withCredentials:true,
        // }).then((res)=>{
        //     setList(res.data);
        // }).catch(err=>{
        //     console.log(err);
        // })
        const l = [];
        for(let i = 1; i < 12; i++){
            l.push({
                id: 0,
                email: "test@email.com",
                category: "식비",
                item: "냉면",
                timestamp: [2024, i, 20],
                method: "카드",
                amount: -4700,
                memo: null
            });
        }

        setList(l);
    }
    useEffect(async () => {
        getData();
    }, []);
    const onTypeBtnClick = (e)=>{
        const type = e.target.textContent;
        if(type === 'All'){
            setSelected("All");
        } else if(type === "Revenue"){
            setSelected("Revenue");
        } else if(type === "Expenses"){
            setSelected("Expenses");
        }
    }

    const [selected, setSelected] = useState("All");
    const types = ["All", "Revenue", "Expenses"];
    const btns = types.map(type=>{
        return <TypeButton onTypeBtnClick={onTypeBtnClick} selected={selected} type={type}></TypeButton>
    })

    return(
        <Wrapper>
            <FilteringWrapper>
                <TypeBtns>
                    {btns}
                </TypeBtns>

                <DateSelector></DateSelector>
            </FilteringWrapper>

            <ListWrapper>

                <RecordHeader></RecordHeader>
                <RecordList list={list}></RecordList>

            </ListWrapper>

        </Wrapper>

    );
}