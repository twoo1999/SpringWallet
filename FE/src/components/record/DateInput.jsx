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
export function DateInput({onChangeValue, value}){
    // console.log(value)
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Date</span>
            <BorderlessInput id="timestamp" name="timestamp" onChange={onChangeValue} type='date' className="Bold16 Black" defaultValue={value ? value.map(x=>String(x).padStart(2, '0')).join("-") : new Date().toISOString().split('T')[0]}></BorderlessInput>
        </Wrapper>


    );
}

