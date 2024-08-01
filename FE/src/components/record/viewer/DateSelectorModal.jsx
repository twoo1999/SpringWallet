import styled from "styled-components";
import '../../../common/fonts.css'
import '../../../common/color.css'
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {useState} from "react";
import {useCookies} from "react-cookie";
const Wrapper = styled.div`
    position: absolute;
    background-color: #D1D1D1;
    transform: translateY(44px);
    border-radius: 16px;
    padding: 16px 18px;
    display: flex;
    flex-direction: row;
    gap:1rem;
    align-items: center;
`;

export function DateSelectorModal({onClick}){
    const [cookies, setCookie, removeCookie] = useCookies(["year", "month"]);
    const [date, setDate] = useState(null);
    const onClickSetBtn = (e)=>{
        const [year, month] = date.split("-");
        setCookie("year", Number(year), {path: '/', expires: new Date(Date.now()+ 604800000)});
        setCookie("month", Number(month), {path: '/', expires: new Date(Date.now()+ 604800000)});
        onClick();
    }
    const onChageDate = (e)=>{
        setDate(e.target.value);
    }
    return(
        <Wrapper>
            <input type="month" max="2030-12-31" min="2000-01-01" onChange={onChageDate}/>
            <Next onClick={onClickSetBtn}></Next>
        </Wrapper>
    )
}