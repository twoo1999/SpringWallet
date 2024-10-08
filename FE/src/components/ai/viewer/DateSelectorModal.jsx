import {DropdownBlock, FlexRowDiv, FlexRowDivByGap, IconButton} from "../../../common/commonStyle";
import {ReactComponent as Next} from "../../../assets/Next.svg";
import {useState} from "react";
export function DateSelectorModal({onChangeDetail}){
    const [date, setDate] = useState();
    const onChangeDate = (e)=>{
        const d = e.target.value;
        const sd = d.split("-");
        setDate(Number(sd[0]) * 12 + Number(sd[1])-1);
    }

    return(
        <>
            <DropdownBlock width="auto" >
                <FlexRowDivByGap gap="1rem">
                    <input type="month" max="2030-12-31" min="2000-01-01" onChange={onChangeDate}/>
                    <IconButton onClick={()=>onChangeDetail(date)}>
                        <Next></Next>
                    </IconButton>

                </FlexRowDivByGap>

            </DropdownBlock>

        </>
    );
}