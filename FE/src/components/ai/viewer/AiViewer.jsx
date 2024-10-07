import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";
import styled from "styled-components";
import {TypeSelector} from "./TypeSelector";
import {useState} from "react";
import {DateSelector} from "./DateSelector";

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export function AiViewer({data}){
    const [type, setType] = useState("All");
    const [date, setDate] = useState(new Date().getFullYear()*12 + new Date().getMonth());
    const nextBtnClickHandler = ()=>{
        setDate(date + 1);
    }
    const prevBtnClickHandler = ()=>{
        setDate(date - 1);
    }
    const dateSelectorChangeHandler = (d)=>{
        console.log(d)
        setDate(d);
    }
    const typeBtnClickHandler = (type)=>{
        setType(type);
    }
    const dateHandler = {
        prev : prevBtnClickHandler,
        next : nextBtnClickHandler,
        detail : dateSelectorChangeHandler
    }
    return (
        <>
            <FilteringWrapper>
                <TypeSelector type={type} clickHandler={typeBtnClickHandler}></TypeSelector>
                <DateSelector date={date} dateHandler={dateHandler}></DateSelector>
            </FilteringWrapper>
            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList data={data}></AnalysisList>
            </ListBlock>

        </>
    );

}