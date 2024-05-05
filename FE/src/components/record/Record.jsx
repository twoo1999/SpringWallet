import '../../common/fonts.css'
import '../../common/color.css'
import styled from "styled-components";
import {RecordViewer} from "./RecordViewer";
import {InputForm} from "./InputForm";


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
`;
const ViewerHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`;
export function Record(){

    return (

        <Wrapper>
            <RecordWrapper>
                <span className="Header22 Gray01">Record</span>
                <InputForm></InputForm>
            </RecordWrapper>
            <ViewerWrapper>
                <span className="Header22 Gray01"> Transaction</span>
                <RecordViewer></RecordViewer>
            </ViewerWrapper>
        </Wrapper>
    );
}
