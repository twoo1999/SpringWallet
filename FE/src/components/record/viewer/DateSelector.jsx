import styled from "styled-components";
import '../../../common/fonts.css'
import '../../../common/color.css'
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {ReactComponent as Prev} from "../../../assets/Prev.svg";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {DateSelectorModal} from "./DateSelectorModal";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
`;

export function DateSelector(){
    const [cookies, setCookie, removeCookie] = useCookies(["year", "month"]);

    const [dateView, setDateView] = useState(false);
    useEffect(() => {
        const [year, month, day] = new Date().toISOString().split('T')[0].split("-");
        if (cookies.year === undefined) {
            setCookie("year", year, {path: '/', expires: new Date(Date.now()+ 604800000)});
        }
        if (cookies.month === undefined) {
            setCookie("month", month, {path: '/', expires: new Date(Date.now()+ 604800000)});
        }
    }, [cookies.year, cookies.month]);

    const onClickNextMonth = ()=>{
        const year = Number(cookies.year);
        const month = Number(cookies.month);
        if(month + 1 >= 13){
            setCookie("year", year+1, {path: '/', expires: new Date(Date.now()+ 604800000)});
            setCookie("month", 1, {path: '/', expires: new Date(Date.now()+ 604800000)});
        } else {
            setCookie("month", month+1, {path: '/', expires: new Date(Date.now()+ 604800000)});
        }

    }

    const onClickPrevMonth = ()=>{
        const year = Number(cookies.year);
        const month = Number(cookies.month);
        if(month - 1 <= 0){
            setCookie("year", year-1, {path: '/', expires: new Date(Date.now()+ 604800000)});
            setCookie("month", 12, {path: '/', expires: new Date(Date.now()+ 604800000)});
        } else {
            setCookie("month", month-1, {path: '/', expires: new Date(Date.now()+ 604800000)});
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
            <span className="Bold16" onClick={onClickDate}>{cookies.year}.{String(cookies.month).padStart(2, '0')}</span>
            <Next onClick={onClickNextMonth}></Next>
        </Wrapper>
    )
}