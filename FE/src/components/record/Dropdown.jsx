import styled from "styled-components";
import '../../common/color.css';
import '../../common/fonts.css';
import {useState} from "react";
import {DirectInputModal} from "./DirectInputModal";

const Wrapper = styled.div`
    position: absolute;
    background-color: #D1D1D1;
    transform: translateY(44px);
    padding: 16px 18px;
    border-radius: 8px;
    width: 120px;
    box-sizing: border-box;
    color: black;
`;

const CategorySelector = styled.div`
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

const DirectSelector = styled.div`
    padding: 16px 0px;
`;


function Dropdown({onSelect, sign, num, items}) {

    const [view, setView] = useState(false);
    const list = [];
    items.forEach(item=>{
        list.push(<span onClick={()=>onSelect(item)}>{item}</span>)
    })

    return (
        <Wrapper>
            <CategorySelector>
                {list}
            </CategorySelector>
            <DirectSelector>
                <span onClick={()=>setView(!view)}>직접입력</span>
                {view && <DirectInputModal onSelect={(item)=>onSelect(item)}></DirectInputModal>}
            </DirectSelector>
        </Wrapper>


    );
}

export default Dropdown;