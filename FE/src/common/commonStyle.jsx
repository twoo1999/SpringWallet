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
    cursor: pointer;
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

export const ModalBackBlur = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
`;

export const ClickableSpan = styled.span`
    cursor: pointer;
`;

export const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
`;
export const ListBlock = styled(FlexColumnDiv)`
    background-color: white;
    border-radius: 16px;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #666666;
`;

export const ListHeader = styled(FlexRowDiv)`
    width: 100%;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 2px solid #9F9F9F;
`;

export const DynamicSpan = styled.span`
    width: ${(props) => props.width || "10px"};
    text-align: ${(props) => props.side || "left"};
`;