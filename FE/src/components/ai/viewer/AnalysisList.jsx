import {DynamicSpan, ListWrapper, RowWrapper} from "../../../common/commonStyle";

export function AnalysisList(){
    const data = [
        {
            "start_date": [2024, 5, 10],
            "end_date": [2024, 6, 10],
            "type": 'all',
            "result" : '분석결과1'
        },
        {
            "start_date": [2024, 6, 10],
            "end_date": [2024, 7, 10],
            "type": 'revenue',
            "result" : '분석결과2'
        },
        {
            "start_date": [2024, 7, 10],
            "end_date": [2024, 8, 10],
            "type": 'expense',
            "result" : '분석결과3'
        }

    ]

    const list = data.map(x=>{
        const start =`${x.start_date[0]}.${String(x.start_date[1]).padStart(2, '0')}.${String(x.start_date[2]).padStart(2, '0')}`;
        const end =`${x.end_date[0]}.${String(x.end_date[1]).padStart(2, '0')}.${String(x.end_date[2]).padStart(2, '0')}`;
        return <RowWrapper>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{start}</DynamicSpan>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{end}</DynamicSpan>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{x.type}</DynamicSpan>
        </RowWrapper>
    })
    return(
        <>
            <ListWrapper>
                {list}
            </ListWrapper>
        </>
    );
}