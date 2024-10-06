import {FlexRowDiv, FlexRowDivByGap, SpanBtn} from "../../../common/commonStyle";

export function TypeSelector(){
    const types = ["All", "Revenue", "Expense"];
    const typeBtns = types.map(type=>{
        return <SpanBtn className="Bold16">{type}</SpanBtn>
    })
    return (
        <FlexRowDivByGap gap="2rem">
            {typeBtns}
        </FlexRowDivByGap>
    );
}