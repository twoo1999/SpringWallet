import styled from "styled-components";
import {ReactComponent as Minus} from "../../../assets/Minus.svg";
import {ReactComponent as Plus} from "../../../assets/Plus.svg";
import {CustomButton} from "../CustomButton";
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5rem;
    box-sizing: border-box;
    justify-content: space-between;
    gap: 2rem;
    //align-items: center;
    border-radius: 16px;
    width: 30rem;
`;

const ItemRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

const Btn = styled.div`
    cursor: pointer;
    
`;

const ItemInput = styled.input`
    border: 2px solid gray;
    width: 20rem;
    border-radius: 5px;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    //justify-content: space-between;
    gap:2rem;
`;
export function CategorySettingModal({items, onItemInputChange, deleteItem, newItem, onPlusClick, onMinusClick, onSaveBtnClick, onCancleBtnClick}){
    const itemRow = [];
    items.forEach(item=>{
        if(!deleteItem.map(di=>di.name).includes(item.name)){
            itemRow.push(<ItemRow>
                    <span className="Black Bold16">{item.name}</span>
                    <Btn id={item.id} name={item.name} onClick={onMinusClick}>
                        <Minus></Minus>
                    </Btn>

                </ItemRow>
            );
        }

    })

    newItem.forEach(item=>{
        itemRow.push(<ItemRow>
                <span className="Black Bold16">{item}</span>
                <Btn id={null} name={item} onClick={onMinusClick}>
                    <Minus></Minus>
                </Btn>

            </ItemRow>
        );
    })

    return(
        <Wrapper onClick={(e) => e.stopPropagation()}>
            {itemRow}
            <ItemRow>
                <ItemInput onChange={onItemInputChange}></ItemInput>
                <Btn onClick={onPlusClick}>
                    <Plus></Plus>
                </Btn>
            </ItemRow>
            <BtnWrapper>
                <CustomButton content="저장" bgColor="#299D91" onClickBtn={onSaveBtnClick}></CustomButton>
                <CustomButton content="닫기" bgColor="gray" onClickBtn={onCancleBtnClick}></CustomButton>
            </BtnWrapper>




        </Wrapper>
    )
}