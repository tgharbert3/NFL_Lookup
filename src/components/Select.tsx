import { useEffect, useState, ChangeEvent } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAppDispatch } from "../stores/hooks";
import Option from "./Option";
import { fetchGameByWeek, gameSet } from "../stores/GameSlice";
import "../index.css"


export default function Select() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState('1');

    useEffect(() => {
        async function getWeek() {
            console.log(selectedValue);
            await dispatch(fetchGameByWeek(selectedValue))
            .then(response => {dispatch(gameSet(response.payload.data))})
        }
        getWeek();
    }, [selectedValue])


    const options: React.ReactNode[] = [];
    for (let i = 1; i < 19; i++) {
        options.push(<Option weekNum={String(i)} key={i}/>)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
            event.preventDefault();
            setSelectedValue(event.target.value) 
            navigate(`/games/week/${event.target.value}`)
    }
    
    return (
        <>
            <form>
                <select onChange={onChangeHandler} className="bg-slate-200 ml-3.5 border border-black">
                    {options}
                </select>
            </form>
            <Outlet />
        </>
        
    )
}