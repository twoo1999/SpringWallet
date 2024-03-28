import styled from "styled-components";
import '../../common/fonts.css'
import '../../common/color.css'
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import {ReactComponent as Minus} from "../../assets/Minus.svg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;

const AmountDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    gap:10px;
`;

const AmountSpan = styled.span`
    width: 100%;
    text-align: end;
`;


export function InputBlock({num}){
    const types = ["Item", "Amount", "Category", "Payment Method", "Date"];
    let input = <span className="Bold16 Black">선택하세요</span>;
    if (num == 2) {
        input = <AmountDiv>
            <Plus></Plus>
            <AmountSpan className="Bold16 Black">0</AmountSpan>
        </AmountDiv>
    }
    return(
        <Wrapper>
            <span className="Regular12 Gray02">{types[num]}</span>
            {input}
        </Wrapper>
    );
}