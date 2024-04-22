import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 2px solid #9F9F9F;
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


export function RecordHeader({data}){
    return(
        <Wrapper>
            <ItemP className="ExtraBold18">Item</ItemP>
            <TextP className="ExtraBold18">Amount</TextP>
            <CategoryP className="ExtraBold18">Category</CategoryP>
            <TextP className="ExtraBold18">Payment Method</TextP>
            <TextP className="ExtraBold18">Date</TextP>
            <MemoP className="ExtraBold18">Memo</MemoP>
        </Wrapper>
    )
}