import { useEffect, useState, ChangeEvent } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAppDispatch } from "../stores/hooks";
import Option from "./Option";
import { fetchGame } from "../stores/GameSlice";


export default function Select() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState('1') 
    const [currentWeekGames, setCurrentWeekGames] = useState([])

    useEffect(() => {
        async function getWeek() {
            console.log(selectedValue);
            await dispatch(fetchGame(selectedValue))
            .then(response => {setCurrentWeekGames(response.payload.data)})
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
                <select onChange={onChangeHandler}>
                    {options}
                </select>
            </form>
            <Outlet />
        </>
        
    )
}