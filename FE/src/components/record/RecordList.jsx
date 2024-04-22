import styled from "styled-components";
import {ReactComponent as Memo} from "../../assets/memo.svg";
const Wrapper = styled.div`
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
export function RecordList(){
    return (
        <Wrapper>
            <CategoryP className="ExtraBold18">식비</CategoryP>
            <ItemP className="ExtraBold18">밥</ItemP>
            <TextP className="ExtraBold18">2023.08.05</TextP>
            <TextP className="ExtraBold18">현금</TextP>
            <AmountP className="ExtraBold18" color={18000 > 0 ? '#299D91' : 'red'}>+18,000</AmountP>
            <MemoButton>
                <Memo></Memo>
            </MemoButton>


        </Wrapper>
    );
}
