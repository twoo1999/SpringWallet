import {BorderlessInput, FlexRowDiv, InputBlock, MemoInput, ModalPage, StyledBtn} from "../../../common/commonStyle";
import {DateInput} from "../Input/DateInput";
import {TypeDropdown} from "../Input/TypeDropDown";
import styled from "styled-components";

const InfoWrapper = styled(FlexRowDiv)`
    width: 100%;
    justify-content: space-between ;
`;

const Btns = styled.div`
    display: flex;
    flex-direction: row;
    gap : 2rem;
`;
export function AnalysisDataModal({data}){
    const getDateString = (date)=>{
        return `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`
    }
    return (
        <>
            <ModalPage onClick={(e)=>e.stopPropagation()}>
                <InfoWrapper>
                    <DateInput type="start" value={getDateString(data.start_date)}></DateInput>
                    <DateInput type="end" value={getDateString(data.end_date)}></DateInput>
                    <InputBlock>
                        <span className="Regular12 Gray02">Type</span>
                        <BorderlessInput className="Bold16 Black" readOnly={true} value={data.type}></BorderlessInput>
                    </InputBlock>
                </InfoWrapper>

                <MemoInput value={data.result} readOnly></MemoInput>
                <Btns>
                    <StyledBtn bgColor={"red"}>삭제</StyledBtn>
                    <StyledBtn bgColor={"#299D91"}>닫기</StyledBtn>
                </Btns>
            </ModalPage>
        </>
    );
}

