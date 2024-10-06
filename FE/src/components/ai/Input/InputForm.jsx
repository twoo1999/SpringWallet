import {IconButton, InputTable} from "../../../common/commonStyle";
import {ReactComponent as Analyze} from "../../../assets/Analyze.svg";
import {ReactComponent as Loading} from "../../../assets/loading.svg";
import {TypeInput} from "./TypeInput";
import {DateInput} from "./DateInput";
import {useEffect, useState} from "react";
import {postApi} from "../../../axiosIntercepter";


export function InputForm({renewAnalysis}) {
    const initValue = {
        start: null,
        end: null,
        type: null,
    };
    const [data, setData] = useState(initValue);
    const [btnAble, setBtnAble] = useState(true);
    const [sse, setSse] = useState(false);
    const setDataHandler = (key, val)=>{
        setData((prevState)=>{
            return {...prevState, [key]: val}
        });
    }

    useEffect(() => {
        const flag = Object.values(data).every(val => val != null);
        if(flag) setBtnAble(false)
        else setBtnAble(true);
    }, [data]);

    useEffect(async () => {
        try {
            const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/ai/emitter/${sessionStorage.getItem("uid")}`, {withCredentials: true});
            setSse(true);
            eventSource.addEventListener('data', (e) => {
                alert("분석이 끝났습니다.");
                renewAnalysis();
                eventSource.close();
                setSse(false);
            });
            eventSource.onerror = (e) => {
                eventSource.close();
                setSse(false);
            };
        } catch (e){
            setSse(false);
        }

    }, []);
    const clickPostBtnHandler = ()=>{
        if(new Date(data.start) > new Date(data.end)){
            alert("시작 날짜는 끝 날짜보다 앞서야 합니다. 다시 선택해 주세요.");
            return;
        }

        const s= new EventSource(`${process.env.REACT_APP_API_URL}/ai/emitter`, { withCredentials: true });
        setSse(true);
        s.addEventListener('data', (e)=>{
            alert("분석이 끝났습니다.");
            renewAnalysis();
            s.close();
            setSse(false);
        })

        postApi(`${process.env.REACT_APP_API_URL}/ai/gemini`, data); //
        setData(initValue);


    }




    return (
        <>
            <InputTable>
                <DateInput type='Start' value={data.start} setDataHandler={setDataHandler}></DateInput>
                <DateInput type='End' value={data.end} setDataHandler={setDataHandler}></DateInput>
                <TypeInput value={data.type} setDataHandler={setDataHandler}></TypeInput>
                <IconButton disabled={btnAble}>
                    {
                            !sse ? <Analyze onClick={clickPostBtnHandler}  fill={btnAble ? "lightgray" : "black"}></Analyze>
                            : <Loading></Loading>
                    }

                </IconButton>
            </InputTable>
        </>
    )

}