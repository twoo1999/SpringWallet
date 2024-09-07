import {DropdownBlock, Selector} from "../../../common/commonStyle";

export function TypeDropdown({selectTypeHandler}) {
    const items = ["수입", "지출", "수입/지출"]
    const list = [];
    items.forEach(item=>{
        list.push(<span id={item.id} key={item.id} onClick={()=>selectTypeHandler(item)}>{item}</span>)
    })

    return (
        <DropdownBlock className="Regular14">
            <Selector>
                {list}
            </Selector>
        </DropdownBlock>


    );
}