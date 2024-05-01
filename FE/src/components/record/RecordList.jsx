import styled from "styled-components";
import {ReactComponent as Memo} from "../../assets/memo.svg";
import {useEffect, useState} from "react";
import axios from "axios";
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
export function RecordList({list}){
    const content = list.map(l=>{
        return <RowWrapper>
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


    return (
        <Wrapper>
            {content}
        </Wrapper>
    );
}
