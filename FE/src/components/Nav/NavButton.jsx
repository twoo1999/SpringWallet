import styled from "styled-components";
import {ReactComponent as Overview} from "../../assets/Overview.svg";
import {ReactComponent as Record} from "../../assets/Record.svg";
import {ReactComponent as Fast} from "../../assets/Fast.svg";
import {ReactComponent as AI} from "../../assets/AI.svg";
import {ReactComponent as Goal} from "../../assets/Goal.svg";
import {ReactComponent as Settings} from "../../assets/Settings.svg";
import {ReactComponent as Logout} from "../../assets/Logout.svg";

const MenuStr = styled.span`
    color: white;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    border-radius: 4px;
    padding: 12px 16px;    
    width: 15rem;
    background: ${props=>props.bColor};
`;
export function NavButton(props) {
    const c = props.bColor;
    const num = props.num;
    const strs = ["한 눈에 보기", "기록", "빠른 기록", "AI 분석", "목표", "설정", "Logout"]
    let icon;

    switch (num) {
        case 0:
            icon = <Overview></Overview>;
            break;
        case 1:
            icon = <Record></Record>;
            break;
        case 2:
            icon = <Fast></Fast>;
            break;
        case 3:
            icon = <AI></AI>;
            break;
        case 4:
            icon = <Goal></Goal>
            break;
        case 5:
            icon = <Settings></Settings>;
            break;
        case 6:
            icon = <Logout></Logout>;
            break;
    }
    return (
        <Wrapper bColor={c}>
            {icon}
            <MenuStr>{strs[num]}</MenuStr>
        </Wrapper>

    );
}