import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";
import styled from "styled-components";
import {TypeSelector} from "./TypeSelector";
import {useState} from "react";

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export function AiViewer({data}){
    const [type, setType] = useState("All");
    const typeBtnClickHandler = (type)=>{
        setType(type);
    }
    return (
        <>
            <FilteringWrapper>
                <TypeSelector type={type} clickHandler={typeBtnClickHandler}></TypeSelector>
                <>asd</>
            </FilteringWrapper>
            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList data={data}></AnalysisList>
            </ListBlock>

        </>
    );

}