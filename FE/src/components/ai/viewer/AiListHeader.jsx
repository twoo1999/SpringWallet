import {DynamicSpan, ListHeader} from "../../../common/commonStyle";

export function AiListHeader(){
    const list = ["Start", "End", "Type"];
    const content = list.map(x=><DynamicSpan width="150px" side="center" className="ExtraBold18">{x}</DynamicSpan>)
    return (
        <>
            <ListHeader>
                {content}
            </ListHeader>
        </>
    );
}