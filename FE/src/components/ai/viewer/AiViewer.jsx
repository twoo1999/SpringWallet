import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";
import styled from "styled-components";
import {TypeSelector} from "./TypeSelector";

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export function AiViewer({data}){

    return (
        <>
            <FilteringWrapper>
                <TypeSelector></TypeSelector>
                <>asd</>
            </FilteringWrapper>
            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList data={data}></AnalysisList>
            </ListBlock>

        </>
    );

}