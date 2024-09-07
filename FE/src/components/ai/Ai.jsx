import styled from "styled-components";
import {InputForm} from "./Input/InputForm";


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

export function Ai(){
    return(
        <Wrapper>
            <RecordWrapper>
                <span className="Header22 Gray01">AI analysis</span>
                <InputForm></InputForm>
            </RecordWrapper>
        </Wrapper>

    )

}