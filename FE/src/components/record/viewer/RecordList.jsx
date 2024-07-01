import styled from "styled-components";
import {useEffect, useState} from "react";
import {DataDetailModal} from "./DataDetailModal";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
`;

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
    
    cursor: pointer;
`;

const CategoryP = styled.span`
    width: 100px;
    text-align: center;
`;


const TextP = styled.span`
    width: 160px;
    text-align: center;
`;

const ItemP = styled.span`
    width: 160px;
    text-align: center;
`;


const AmountP = styled.span`
    color: ${props=>props.color};
    width: 160px;
    text-align: center;
`;
const ModalBack = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        
    `;
export function RecordList({list, CM, R}){
    const [detailView, setDetailView] = useState(false);
    const [data, setData] = useState();

    const onDataClick = (e)=>{
        setData(list.filter(l=>{
            return l.id === Number(e.currentTarget.getAttribute('id'));
        }));
        setDetailView(!detailView);
        // setData()
    }

    const partData = list.map((l, idx)=>{
        return {idx, "val":l.timestamp[2]};
    })
    partData.sort((x, y) => y.val - x.val);
    const sortedList = partData.map(pd=>{
        return list[pd.idx];
    })

    const content = sortedList.map(l=>{
        return <RowWrapper id={l.id} key={l.id} onClick={onDataClick}>
            <CategoryP key="category" className="ExtraBold18">{l.category.category_name}</CategoryP>
            <ItemP key="item" className="ExtraBold18">{l.item}</ItemP>
            <TextP key="date" className="ExtraBold18">{l.timestamp[0]}.{String(l.timestamp[1]).padStart(2, '0')}.{String(l.timestamp[2]).padStart(2, '0')}</TextP>
            <TextP key="method" className="ExtraBold18">{l.method.method_name}</TextP>
            <AmountP key="amout" className="ExtraBold18" color={l.amount > 0 ? '#299D91' : 'red'}>{l.amount>0? `+${(l.amount).toLocaleString()}` : `${(l.amount).toLocaleString()}`}</AmountP>
        </RowWrapper>

    })
    const closeDetailModalHandeler = ()=>{
        setDetailView(!detailView);
    }

    return (
        <Wrapper>
            {content}
            {
                detailView &&
                <ModalBack onClick={closeDetailModalHandeler}>
                    <DataDetailModal data={data} CM={CM} R={R} closeDetailModalHandeler={closeDetailModalHandeler}></DataDetailModal>
                </ModalBack>
            }


        </Wrapper>
    );
}
