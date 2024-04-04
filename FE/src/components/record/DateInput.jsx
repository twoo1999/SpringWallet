import styled from "styled-components";

const BorderlessInput = styled.input`
    border: none;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
export function DateInput(){
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Date</span>
            <BorderlessInput type='date' className="Bold16 Black"></BorderlessInput>
        </Wrapper>


    );
}