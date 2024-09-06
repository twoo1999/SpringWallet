import styled from "styled-components";

export const InputTable = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 16px;
    justify-content: space-between;
    border-radius: 16px;
    padding : 30px 64px; 
    align-items: center;
    border: 2px solid #666666;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
`;
export const BorderlessInput = styled.input`
    border: none;
`;

export const IconButton = styled.div`
    cursor: pointer;
`;