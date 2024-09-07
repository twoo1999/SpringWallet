import {DropdownBlock, Selector} from "../../../common/commonStyle";

export function TypeDropdown() {
    const items = ["수입", "지출", "수입/지출"]
    const list = [];
    items.forEach(item=>{
        list.push(<span id={item.id} key={item.id}>{item}</span>)
    })

    return (
        <DropdownBlock className="Regular14">
            <Selector>
                {list}
            </Selector>
        </DropdownBlock>


    );
}