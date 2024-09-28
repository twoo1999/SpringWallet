import {DynamicSpan, ListWrapper, ModalBackBlur, RowWrapper} from "../../../common/commonStyle";
import {useState} from "react";
import {AnalysisDataModal} from "./AnalysisDataModal";

export function AnalysisList(){
    const data = [
        {
            "id": 1,
            "start_date": [2024, 5, 10],
            "end_date": [2024, 6, 10],
            "type": 'all',
            "result" : '분석결과1'
        },
        {
            "id": 2,
            "start_date": [2024, 6, 10],
            "end_date": [2024, 7, 10],
            "type": 'revenue',
            "result" : '분석결과2'
        },
        {
            "id": 3,
            "start_date": [2024, 7, 10],
            "end_date": [2024, 8, 10],
            "type": 'expense',
            "result" : '분석결과3'
        }

    ]
    const [modalView, setModalView] = useState(false);
    const [modalData, setModalData] = useState("");
    const closeModalHandler = ()=>{
        setModalView(!modalView);
    }
    const clickListHandler = (e)=>{
        // console.log(data.filter(d=>{
        //     return d.id === Number(e.currentTarget.getAttribute('id'));
        // })[0])
        setModalData(data.filter(d=>{
            return d.id === Number(e.currentTarget.getAttribute('id'));
        })[0]);
        setModalView(!modalView);
    }
    const list = data.map(x=>{
        const start =`${x.start_date[0]}.${String(x.start_date[1]).padStart(2, '0')}.${String(x.start_date[2]).padStart(2, '0')}`;
        const end =`${x.end_date[0]}.${String(x.end_date[1]).padStart(2, '0')}.${String(x.end_date[2]).padStart(2, '0')}`;
        return <RowWrapper id={x.id} onClick={clickListHandler}>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{start}</DynamicSpan>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{end}</DynamicSpan>
            <DynamicSpan width="150px" side="center" className="ExtraBold18">{x.type}</DynamicSpan>
        </RowWrapper>
    })
    return(
        <>
            <ListWrapper>
                {list}
                {
                    modalView &&
                    <ModalBackBlur onClick={closeModalHandler}>
                        <AnalysisDataModal data={modalData}></AnalysisDataModal>
                    </ModalBackBlur>
                }
            </ListWrapper>
        </>
    );
}