import styled from "styled-components";
import '../../../common/color.css';
import '../../../common/fonts.css';

const Wrapper = styled.div`
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



function Dropdown({onSelect, items, onSettingClick}) {

    const list = [];
    items.forEach(item=>{
        list.push(<span id={item.id} key={item.id} onClick={()=>onSelect(item.id)}>{item.name}</span>)
    })

    return (
        <Wrapper className="Regular14">
            <CategorySelector>
                {list}
            </CategorySelector>
            <span onClick={onSettingClick}>
                추가/삭제
            </span>
        </Wrapper>


    );
}

export default Dropdown;