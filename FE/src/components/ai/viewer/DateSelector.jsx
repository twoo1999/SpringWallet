import {FlexRowDivByGap, IconButton} from "../../../common/commonStyle";
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {ReactComponent as Prev} from "../../../assets/Prev.svg";
import {useEffect, useRef, useState} from "react";
import {DateSelectorModal} from "./DateSelectorModal";
export function DateSelector({date, dateHandler}){
    const [dropView, setDropView] = useState(false);
    const dropRef = useRef();
    const getStringDate = (date)=>{
        return `${Math.floor(date / 12)}.${String(date%12+1).padStart(2, '0')}`;

    }
    const clickDateHandler = ()=>{
        setDropView(!dropView)
    }
    useEffect(() => {
        function handleClickOutside(e){
            if(dropRef.current && !dropRef.current.contains(e.target)){
                setDropView(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropRef]);

    const onClickConfirmDateHandler = (d)=>{
        dateHandler.detail(d);
        setDropView(!dropView);
    }
    return (
        <FlexRowDivByGap gap="1rem" ref={dropRef}>
            {
                dropView &&
                <DateSelectorModal onChangeDetail={onClickConfirmDateHandler}></DateSelectorModal>
            }
            <IconButton onClick={dateHandler.prev}><Prev></Prev></IconButton>
            <span className="Bold16" onClick={clickDateHandler}>{getStringDate(date)}</span>
            <IconButton onClick={dateHandler.next}><Next></Next></IconButton>
        </FlexRowDivByGap>

    );
}