import '../../common/fonts.css'
import '../../common/color.css'
import styled from "styled-components";
import {RecordViewer} from "./viewer/RecordViewer";
import {InputForm} from "./input/InputForm";
import {getApi} from "../../axiosIntercepter";
import {useEffect, useState} from "react";


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

export function Record(){
    const [record, setRecord] = useState();
    const [category, setCategory] = useState();
    const [method, setMethod] = useState();
    const getCategory = async ()=>{
        return await getApi(`${process.env.REACT_APP_BASE_URL}/category`);
    }
    const getMethod = async ()=>{
        return await getApi(`${process.env.REACT_APP_BASE_URL}/method`);
    }

    const getRecord = async ()=>{
        return await getApi(`${process.env.REACT_APP_BASE_URL}/record`);
    }


    const renewCategory = async ()=>{
        setCategory(await getCategory());
    }
    const renewMethod = async ()=>{
        setMethod(await getMethod());
    }

    const renewRecord = async ()=>{
        setRecord(await getRecord());
    }


    // renewCategory();
    // renewMethod();
    // renewRecord();
    useEffect(() => {
        renewCategory();
        renewMethod();
        renewRecord();
    }, []);

    const CM = {
        category, method, renewMethod, renewCategory
    }

    const R = {
        record, renewRecord,
    };


    return (
        <Wrapper>
            <RecordWrapper>
                <span className="Header22 Gray01">Record</span>
                <InputForm CM={CM} R={R}></InputForm>
            </RecordWrapper>
            <ViewerWrapper>
                <span className="Header22 Gray01"> Transaction</span>
                <RecordViewer CM={CM} R={R}></RecordViewer>
            </ViewerWrapper>
        </Wrapper>
    );
}
