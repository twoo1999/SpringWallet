import styled from "styled-components";
import '../../../common/fonts.css'
import '../../../common/color.css'
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {ReactComponent as Prev} from "../../../assets/Prev.svg";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {DateSelectorModal} from "./DateSelectorModal";
import { use } from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
`;

export function DateSelector({R}){
    // const [cookies, setCookie, removeCookie] = useCookies(["year", "month"]);
    const [date, setDate] = useState({year: 0, month: 0});
    const [dateView, setDateView] = useState(false);
    useEffect(() => {
        console.log(date)
        const [year, month, day] = new Date().toISOString().split('T')[0].split("-").map(x=>Number(x));
        if(date.year === 0 || date.month === 0){
            setDate({year, month});
        } else {
            R.renewRecord(date.year, date.month);
        }
        // if (cookies.year === undefined) {
        //     setCookie("year", year, {path: '/', expires: new Date(Date.now()+ 604800000)});
        // }
        // if (cookies.month === undefined) {
        //     setCookie("month", month, {path: '/', expires: new Date(Date.now()+ 604800000)});
        // }
    }, [date]);

    const onClickNextMonth = ()=>{
        // const year = Number(cookies.year);
        // const month = Number(cookies.month);

        if(date.month + 1 >= 13){
            setDate({year:date.year+1, month:1});
            
            // setCookie("year", year+1, {path: '/', expires: new Date(Date.now()+ 604800000)});
            // setCookie("month", 1, {path: '/', expires: new Date(Date.now()+ 604800000)});
        } else {
            setDate({...date, month:date.month+1});
            // setCookie("month", month+1, {path: '/', expires: new Date(Date.now()+ 604800000)});
        }
        
        

    }

    const onClickPrevMonth = ()=>{
        // const year = Number(cookies.year);
        // const month = Number(cookies.month);

        if(date.month - 1 <= 0){
            setDate({year:date.year-1, month:12});
            // setCookie("year", year-1, {path: '/', expires: new Date(Date.now()+ 604800000)});
            // setCookie("month", 12, {path: '/', expires: new Date(Date.now()+ 604800000)});
        } else {
            setDate({...date, month:date.month-1});
            // setCookie("month", month-1, {path: '/', expires: new Date(Date.now()+ 604800000)});
        }
        

    }

    const onClickDate = ()=>{
        setDateView(!dateView);
    }
    return(
        <Wrapper>
            {
                dateView &&
                <DateSelectorModal onClick={onClickDate}></DateSelectorModal>
            }
            <Prev onClick={onClickPrevMonth}></Prev>
            {/* <span className="Bold16" onClick={onClickDate}>{cookies.year}.{String(cookies.month).padStart(2, '0')}</span> */}
            <span className="Bold16" onClick={onClickDate}>{date.year}.{String(date.month).padStart(2, '0')}</span>
            <Next onClick={onClickNextMonth}></Next>
        </Wrapper>
    )
}