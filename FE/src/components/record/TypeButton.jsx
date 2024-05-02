import styled from "styled-components";
import '../../common/fonts.css'
import '../../common/color.css'
const Wrapper = styled.span`
    color: ${props=>props.isSelected ? '#299D91' : '#666666'};
`;

export function TypeButton({selected, type}){
    console.log(type)
    return(
        <Wrapper className="Bold16" isSelected={selected===type}>
            <span>{type}</span>
        </Wrapper>
    )
}