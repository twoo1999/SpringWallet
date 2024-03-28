import '../../common/fonts.css'
import '../../common/color.css'
import styled from "styled-components";
import {InputBlock} from "./InputBlock";
import {ReactComponent as Report} from "../../assets/Report.svg";
import {ReactComponent as Memo} from "../../assets/memo.svg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 24px;
    gap: 10px;
`;

const RecordTable = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 16px;
    justify-content: space-between;
    border-radius: 16px;
    padding : 30px 64px; 
    align-items: center;
`;
export function Record(){
    const inputBlock = [];
    for(let i = 0; i < 5; i++){
        inputBlock.push(<InputBlock num={i}></InputBlock>)
    }
    return (
        <Wrapper>
            <span className="Header22 Gray01">Record</span>
            <RecordTable className="White">
                {inputBlock}
                <Memo></Memo>
                <Report></Report>
            </RecordTable>
        </Wrapper>
    )
}