import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";
import styled from "styled-components";
import {TypeSelector} from "./TypeSelector";
import {useEffect, useState} from "react";
import {DateSelector} from "./DateSelector";

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export function AiViewer({data}){
    const [type, setType] = useState("All");
    const [date, setDate] = useState(new Date().getFullYear()*12 + new Date().getMonth());
    const [analysis, setAnalysis] = useState(data);
    const nextBtnClickHandler = ()=>{
        setDate(date + 1);
    }
    const prevBtnClickHandler = ()=>{
        setDate(date - 1);
    }
    const dateSelectorChangeHandler = (d)=>{
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

    useEffect(() => {
        const filteredData = data.filter(d=>{
            const start =  d.start_date[0] * 12 + d.start_date[1] -1;
            const end = d.end_date[0] * 12 + d.end_date[1] - 1;
            if(end === start){
                if(start === date){
                    return true;
                }
            } else{
                if(start <= date && end >= date){
                    return true;
                }
            }
            return false;
        })
        setAnalysis(filteredData);
    }, [date]);
    return (
        <>
            <FilteringWrapper>
                <TypeSelector type={type} clickHandler={typeBtnClickHandler}></TypeSelector>
                <DateSelector date={date} dateHandler={dateHandler}></DateSelector>
            </FilteringWrapper>
            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList data={analysis}></AnalysisList>
            </ListBlock>

        </>
    );

}