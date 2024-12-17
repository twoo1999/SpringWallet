import '../../common/fonts.css'
import '../../common/color.css'
import styled from "styled-components";
import {RecordViewer} from "./viewer/RecordViewer";
import {InputForm} from "./input/InputForm";
import {getApi} from "../../axiosIntercepter";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

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
    const navigate = useNavigate();
    const [record, setRecord] = useState();
    const [category, setCategory] = useState();
    const [method, setMethod] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["year", "month"]);
    const getCategory = async ()=>{
        try {
            return await getApi(`${process.env.REACT_APP_API_URL}/category`);
        } catch (e){
            return [];
            // navigate("/error");
        }



    }
    const getMethod = async ()=>{
        try{
            return await getApi(`${process.env.REACT_APP_API_URL}/method`);
        } catch (e){
            return [];
            // navigate("/error");
        }

    }

    const getRecord = async (year, month)=>{
        try {
            return await getApi(`${process.env.REACT_APP_API_URL}/record?year=${year}&month=${month}`);
        } catch (e){
            return [];
            // navigate("/error");
        }

    }


    const renewCategory = async ()=>{
        setCategory(await getCategory());
    }
    const renewMethod = async ()=>{
        setMethod(await getMethod());
    }

    const renewRecord = async (year, month)=>{
        setRecord(await getRecord(year, month));
    }

    useEffect(() => {
        renewCategory();
        renewMethod();
        // renewRecord();
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
