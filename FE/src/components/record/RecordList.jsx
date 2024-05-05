import styled from "styled-components";
import {ReactComponent as Memo} from "../../assets/memo.svg";
import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
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

const MemoP = styled.span`
    width: 60px;
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
const MemoButton = styled.button`
    border: none;
    background-color: white;
    width: 60px;
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
export function RecordList({list}){
    const [detailView, setDetailView] = useState(true);
    const [data, setData] = useState();

    const onDataClick = ()=>{

    }

    const content = list.map(l=>{
        return <RowWrapper key={l.id}>
            <CategoryP className="ExtraBold18">{l.category}</CategoryP>
            <ItemP className="ExtraBold18">{l.item}</ItemP>
            <TextP className="ExtraBold18">{l.timestamp[0]}.{String(l.timestamp[1]).padStart(2, '0')}.{String(l.timestamp[2]).padStart(2, '0')}</TextP>
            <TextP className="ExtraBold18">{l.method}</TextP>
            <AmountP className="ExtraBold18" color={l.amount > 0 ? '#299D91' : 'red'}>{l.amount>0? `+${(l.amount).toLocaleString()}` : `${(l.amount).toLocaleString()}`}</AmountP>
            <MemoButton>
                <Memo></Memo>
            </MemoButton>
        </RowWrapper>

    })
    const closeDetaolModalHandeler = ()=>{
        setDetailView(!detailView);
    }

    return (
        <Wrapper>
            {content}
            {
                detailView &&
                <ModalBack onClick={closeDetaolModalHandeler}>
                    <DataDetailModal></DataDetailModal>
                </ModalBack>
            }


        </Wrapper>
    );
}
