import styled from "styled-components";
import {InputForm} from "./Input/InputForm";
import {AiViewer} from "./viewer/AiViewer";
import {useEffect, useState} from "react";
import {getApi} from "../../axiosIntercepter";


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
    const [analysis, setAnalysis] = useState([]);
    const getAnalysis = async ()=>{
        const d = await getApi(`${process.env.REACT_APP_API_URL}/ai`);
        setAnalysis(d);
    }


    useEffect( () => {
        getAnalysis();
    }, []);
    return(
        <Wrapper>
            <RecordWrapper>
                <span className="Header22 Gray01">AI analysis</span>
                <InputForm renewAnalysis={getAnalysis}></InputForm>
            </RecordWrapper>
            <ViewerWrapper>
                <span className="Header22 Gray01"> Analysis Result</span>
                <AiViewer data={analysis}></AiViewer>
            </ViewerWrapper>
        </Wrapper>

    )

}