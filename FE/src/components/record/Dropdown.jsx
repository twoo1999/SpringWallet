import styled from "styled-components";
import '../../common/color.css';
import '../../common/fonts.css';
// const Wrapper = styled.div`
//     position: absolute;
//     transform: translateY(44px);
//     color: black;
//     background-color: #D1D1D1;
//     display: flex;
//     flex-direction: column;
//     width: 120px;
//     box-sizing: border-box;
//     padding: 16px 18px;
//     overflow-y: scroll;
//     height: 150px;
//     border-top-left-radius: 16px;
//     &::-webkit-scrollbar{
//         width: 5px;
//         border-radius: 16px;
//     }
//     &::-webkit-scrollbar-thumb {
//         border-radius: 16px;
//         background-color: black;
//     }
// `;
//
// const CategorySpan = styled.div`
//     padding: 8px 0px;
// `;
//
// const DirectInputSpan = styled.div`
//     color: black;
//     width: 120px;
//     padding: 8px 0px;
//     background-color: #D1D1D1;
//     position: absolute;
//     transform: translateY(194px);
//     border-bottom-left-radius: 16px ;
// `;

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
function Dropdown({onSelect, items}) {
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
                <span>직접입력</span>
            </DirectSelector>
        </Wrapper>


    );
}

export default Dropdown;