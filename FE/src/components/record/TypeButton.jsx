import styled from "styled-components";
import '../../common/fonts.css'
import '../../common/color.css'
const Wrapper = styled.span`
    color: ${props=>props.$isSelected ? '#299D91' : '#666666'};
    cursor: pointer;
`;

export function TypeButton({selected, type, onTypeBtnClick}){
    return(
        <Wrapper className="Bold16" $isSelected={selected===type}>
            <span type={type} onClick={onTypeBtnClick}>{type}</span>
        </Wrapper>
    )
}