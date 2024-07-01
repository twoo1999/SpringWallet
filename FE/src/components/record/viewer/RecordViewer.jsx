import styled from "styled-components";
import {RecordHeader} from "./RecordHeader";
import {RecordList} from "./RecordList";
import {useEffect, useState} from "react";
import {DateSelector} from "./DateSelector";
import {TypeButton} from "../TypeButton";
import {useCookies} from "react-cookie";
import '../../../common/fonts.css'
import '../../../common/color.css'

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:1rem
`;

const FilteringWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #666666;
`;

const TypeBtns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
`;

const SummaryWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap:3rem;
`;
export function RecordViewer({CM, R}){

    const [list, setList] = useState([]);
    // const getData = async()=>{
    //     return await getApi(`${process.env.REACT_APP_BASE_URL}/record`);
    //     // setList(data);
    //
    //     // await axios({
    //     //     method: "GET",
    //     //     url: `http://localhost:8080/record`,
    //     //     withCredentials:true,
    //     // }).then((res)=>{
    //     //     setList(res.data);
    //     // }).catch(err=>{
    //     //     console.log(err.response.data);
    //     // })
    //     // console.log(data)
    //     // const l = [];
    //     // for(let i = 1; i < 12; i++){
    //     //     l.push({
    //     //         id: 1,
    //     //         user_id: "45dd282a-1922-4104-a3bd-44c8afbbd0d0",
    //     //         category: "식비",
    //     //         item: "냉면",
    //     //         timestamp: [2024, i, 20],
    //     //         method: "카드",
    //     //         amount: -4700,
    //     //         memo: ""
    //     //     });
    //     //     l.push({
    //     //         id: 2,
    //     //         user_id: "45dd282a-1922-4104-a3bd-44c8afbbd0d0",
    //     //         category: "월급",
    //     //         item: "월급",
    //     //         timestamp: [2024, i, 20],
    //     //         method: "현금",
    //     //         amount: 500000,
    //     //         memo: ""
    //     //     });
    //     // }
    //
    //
    //
    // }


    useEffect( () => {
        setList(R.record);
    }, [R.record]);

    const filterData = () => {
        if (list !== undefined) {
            const ll = list.filter(l => {
                if (l.timestamp[0] == cookies.year && l.timestamp[1] == cookies.month) {
                    if (selected === "All") {
                        return true;
                    } else if (selected === "Revenue") {
                        return l.amount > 0;
                    } else if (selected === "Expenses") {
                        return l.amount < 0;
                    }
                }
            });

            setFilteredList(ll);
        }




    };
    const [cookies, setCookie, removeCookie] = useCookies(["year", "month"]);
    const [filterdList, setFilteredList] = useState(list);
    const [selected, setSelected] = useState("All");
    const types = ["All", "Revenue", "Expenses"];
    const [expenses, setExpenses] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const calExpeneses = ()=>{
        setExpenses(filterdList.reduce((acc, cur, idx)=> acc + (cur.amount < 0 ? cur.amount*-1 : 0), 0));
    }

    const calRevenue = ()=>{
        setRevenue(filterdList.reduce((acc, cur, idx)=> acc + (cur.amount > 0 ? cur.amount : 0), 0));

    }
    useEffect(() => {
        filterData();
    }, [list, cookies, selected]);


    useEffect(() => {
        calExpeneses();
        calRevenue();
    }, [filterdList]);
    const onTypeBtnClick = (e)=>{
        const type = e.target.textContent;
        if(type === 'All'){
            setSelected("All");
        } else if(type === "Revenue"){
            setSelected("Revenue");
        } else if(type === "Expenses"){
            setSelected("Expenses");
        }
    }

    const btns = types.map(type=>{
        return <TypeButton key={type} onTypeBtnClick={onTypeBtnClick} selected={selected} type={type}></TypeButton>
    })


    return(
        <Wrapper>
            <FilteringWrapper >
                <TypeBtns>
                    {btns}
                </TypeBtns>

                <DateSelector></DateSelector>
            </FilteringWrapper>

            <ListWrapper>

                <RecordHeader></RecordHeader>
                <RecordList CM={CM} R={R} list={filterdList}></RecordList>
                <SummaryWrapper>
                    {
                        (selected === "All" || selected === "Revenue") &&
                        <span className="ExtraBold18 PrimaryColor">Revenue {revenue.toLocaleString()}</span>
                    }
                    {
                        selected === "All" &&
                        <span className="ExtraBold18">/</span>
                    }
                    {
                        (selected === "All" || selected === "Expenses") &&
                        <span className="ExtraBold18 red">Expenses {expenses.toLocaleString()}</span>
                    }
                </SummaryWrapper>
            </ListWrapper>

        </Wrapper>

    );
}