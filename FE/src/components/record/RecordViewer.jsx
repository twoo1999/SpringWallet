import styled from "styled-components";
import {RecordHeader} from "./RecordHeader";
import {RecordList} from "./RecordList";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
`;

export function RecordViewer(){
    return(
        <Wrapper>
            <RecordHeader></RecordHeader>
            <RecordList></RecordList>
        </Wrapper>
    );
}