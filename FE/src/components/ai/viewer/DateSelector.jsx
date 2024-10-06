import {FlexRowDivByGap, IconButton} from "../../../common/commonStyle";
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {ReactComponent as Prev} from "../../../assets/Prev.svg";
export function DateSelector({date}){
    const getStringDate = (date)=>{
        return `${String(date.getFullYear())}.${String(date.getMonth()).padStart(2, '0')}`;
    }

    return (
        <FlexRowDivByGap gap="1rem">
            <IconButton><Prev></Prev></IconButton>

            <span className="Bold16">{getStringDate(date)}</span>
            <IconButton><Next></Next></IconButton>

        </FlexRowDivByGap>

    );
}