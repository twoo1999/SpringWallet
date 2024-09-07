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

export const IconButton = styled.button`
    border: none;
    cursor: pointer;
    background-color: white;
`;

export const DropdownBlock = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #D1D1D1;
    transform: translateY(46px);
    padding: 16px 18px;
    border-radius: 8px;
    width: 120px;
    gap: 16px;
    box-sizing: border-box;
    color: black;
`;
export const Selector = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 16px;
    
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 16px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 16px;
        background-color: black;
    }

    height: 100px;

`;
