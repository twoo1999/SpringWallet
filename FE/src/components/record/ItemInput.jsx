import styled from "styled-components";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
const BorderlessInput = styled.input`
    border: none;
`;

export function ItemInput({onChangeValue}){
    return (
        <Wrapper>
            <span className="Regular12 Gray02">Item</span>
            <BorderlessInput onChange={onChangeValue} id="item" name="item" type='text' className="Bold16 Black" placeholder="입력하세요"></BorderlessInput>
        </Wrapper>

    );

}
