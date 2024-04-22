import styled from "styled-components";
import {RecordHeader} from "./RecordHeader";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
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
        </Wrapper>
    );
}