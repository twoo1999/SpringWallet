import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";

export function AiViewer({data}){

    return (
        <>

            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList data={data}></AnalysisList>
            </ListBlock>

        </>
    );

}