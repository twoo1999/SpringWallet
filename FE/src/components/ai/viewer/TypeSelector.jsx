import {FlexRowDivByGap, SpanBtn} from "../../../common/commonStyle";

export function TypeSelector({type, clickHandler}){
    const types = ["All", "Revenue", "Expense"];
    const typeBtns = types.map(t=>{
        return <SpanBtn className="Bold16" color={type==t?"#299D91" : "#666666"} onClick={()=>clickHandler(t)}>{t}</SpanBtn>
    })
    return (
        <FlexRowDivByGap gap="2rem">
            {typeBtns}
        </FlexRowDivByGap>
    );
}