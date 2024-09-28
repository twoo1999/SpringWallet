import {ListBlock, ListHeader} from "../../../common/commonStyle";
import {AiListHeader} from "./AiListHeader";
import {AnalysisList} from "./AnalysisList";

export function AiViewer(){

    return (
        <>

            <ListBlock>
                <AiListHeader></AiListHeader>
                <AnalysisList></AnalysisList>
            </ListBlock>

        </>
    );

}