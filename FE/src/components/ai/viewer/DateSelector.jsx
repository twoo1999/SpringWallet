import {FlexRowDivByGap, IconButton} from "../../../common/commonStyle";
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {ReactComponent as Prev} from "../../../assets/Prev.svg";
export function DateSelector({date, clickNextHandler, clickPrevHandler}){
    const getStringDate = (date)=>{
        return `${Math.floor(date / 12)}.${String(date%12+1).padStart(2, '0')}`;

    }


    return (
        <FlexRowDivByGap gap="1rem">
            <IconButton onClick={clickPrevHandler}><Prev></Prev></IconButton>

            <span className="Bold16">{getStringDate(date)}</span>
            <IconButton onClick={clickNextHandler}><Next></Next></IconButton>

        </FlexRowDivByGap>

    );
}