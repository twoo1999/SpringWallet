import styled from "styled-components";
import {InputForm} from "./Input/InputForm";
import {AiViewer} from "./viewer/AiViewer";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 24px;
    gap: 20px;
    box-sizing: border-box;
    height: 100%;
`;

const RecordWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:1rem;
    width: 100rem;
    //height: 10vh;
    
`;

const ViewerWrapper = styled.div`
    width: 100rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50vh;
`;

export function Ai(){
    return(
        <Wrapper>
            <RecordWrapper>
                <span className="Header22 Gray01">AI analysis</span>
                <InputForm></InputForm>
            </RecordWrapper>
            <ViewerWrapper>
                <span className="Header22 Gray01"> Analysis Result</span>
                <AiViewer></AiViewer>
            </ViewerWrapper>
        </Wrapper>

    )

}