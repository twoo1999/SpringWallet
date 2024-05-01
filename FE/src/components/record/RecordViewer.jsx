import styled from "styled-components";
import {RecordHeader} from "./RecordHeader";
import {RecordList} from "./RecordList";
import {useEffect, useState} from "react";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #666666;
`;

export function RecordViewer(){

    const [list, setList] = useState([]);
    const getData = async()=>{
        await axios({
            method: "GET",
            url: `http://localhost:8080/record`,
            withCredentials:true,
        }).then((res)=>{
            setList(res.data);
        }).catch(err=>{
            console.log(err);
        })
        // const l = [];
        // for(let i = 0; i < 20; i++){
        //     l.push({
        //         id: 0,
        //         email: "test@email.com",
        //         category: "식비",
        //         item: "냉면",
        //         timestamp: "2024-04-29",
        //         method: "카드",
        //         amount: -4700,
        //         memo: null
        //     });
        // }
        // setList(l);
    }
    useEffect(async () => {
        getData();
    }, []);
    return(
        <Wrapper>

            <RecordHeader></RecordHeader>
            <RecordList list={list}></RecordList>

        </Wrapper>
    );
}