import { Outlet } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import '../index.css'
import { selectAllTeams} from "../stores/TeamSlice";
import { useAppSelector,useAppDispatch } from "../stores/hooks";
import { teamSet } from "../stores/currentTeamSlice";
import { fetchPlayer, playerSet} from "../stores/currentPlayerSlice";
import Player from "../stores/currentPlayerSlice";


interface Team {
    id: number;
    conference: string;
    division: string;
    location: string;
    name: string;
    full_name: string;
    abbreviation: string;
}

interface Player {
    id: number | null
    first_name: string
    last_name: string
    position: string
    position_abbreviation: string,
    height: string
    weight: string,
    jersey_number: string,
    college: string,
    experience: string,
    age: number | null,
    team: Team
}

const locations: string[] = [];
const names: string[] = [];

export default function SearchBar() {

    const dispatch = useAppDispatch();
    const allTeams = useAppSelector(selectAllTeams);
    const [searchPhrase, setSearchPhrase] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        allTeams.map((team: Team) => {
            locations.push(team.location);
            names.push(team.name);
        })
    })

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchPhrase(event.target.value)
    }

    const filteredLoactions = allTeams.filter((team: Team) => {
            return team.location.toLowerCase().includes(searchPhrase.toLowerCase())
    })

    const filteredNames = allTeams.filter((team: Team) => {
        return team.name.toLowerCase().includes(searchPhrase.toLowerCase())
    })

    const filteredFullTeamNames = allTeams.filter((team: Team) => {
        return team.full_name.toLowerCase().includes(searchPhrase.toLowerCase())
    })

    const onSubmitHandler = (event: FormEvent <HTMLFormElement>) => {
        event.preventDefault();
        if (searchPhrase === '') {
            navigate('/', {replace: true});
            return
        }

        const phrase = searchPhrase.split(" ");

        if (phrase.length === 1) {
            if (filteredLoactions.length > 0) {
                const currentTeam = filteredLoactions[0]
                dispatch(teamSet(currentTeam))
                handleTeamNavigation(currentTeam);
                setSearchPhrase("");
            }
            if (filteredNames.length > 0) {
                const currentTeam = filteredNames[0]
                dispatch(teamSet(currentTeam))
                handleTeamNavigation(currentTeam);
                setSearchPhrase("");
            }
        }
        if (phrase.length === 2) {
            if (filteredFullTeamNames.length > 0) {
                const currentTeam = filteredFullTeamNames[0]
                dispatch(teamSet(currentTeam))
                handleTeamNavigation(currentTeam);
                setSearchPhrase("");
            } else {
                const formattedPhrase = formatNames(phrase)
                getPlayer(formattedPhrase)
                .then((response) => {
                    dispatch(playerSet(response.payload));
                    if (response.payload.length === 1) {
                        handleSinglePlayerNavigation(response.payload[0]);
                    } else {
                        handleMultiplePlayerNavigation(response.payload[0]);
                    }
                    setSearchPhrase('');
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    }

    function formatNames(phrase: string[]) {
        let firstName = phrase[0];
        const lastName = phrase[1];

        let firstLetter = firstName[0].toUpperCase();
        let remainingLetters = firstName.slice(1).toLowerCase();
        let newFirstName = firstLetter + remainingLetters;

        firstLetter = lastName[0].toLocaleUpperCase();
        remainingLetters = lastName.slice(1).toLowerCase();
        let newLastName = firstLetter + remainingLetters;

        const newPhrase = [newFirstName, newLastName]

        return newPhrase;
    }

    function handleTeamNavigation(currentTeam: Team) {
        navigate(`/teams/${currentTeam.location}/${currentTeam.name}/${currentTeam.id}`);
    }   

    function handleSinglePlayerNavigation(player: Player) {
        navigate(`players/${player.first_name}/${player.last_name}/${player.id}`)
    }

    function handleMultiplePlayerNavigation(player: Player) {
        navigate(`players/${player.first_name}/${player.last_name}`)
    }

    async function getPlayer(names: string[]) {
        const foundPlayer = await dispatch(fetchPlayer(names));
        return foundPlayer;
    } 

    return (
        <div>  
            <div className="flex">
                <div className="basis-1/3 text-center">
                    <Link to='/'>Home</Link>
                </div>
                <div className="bg-slate-200 basis-2/4 text-center">
                    <form className="" onSubmit={onSubmitHandler}>
                        <input type="search" placeholder="Search for Players or Teams" 
                            className="border border-black rounded-md mr-3.5 w-3/4" 
                            value={searchPhrase} 
                            onChange={onChangeHandler}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className=" basis-1/3 text-center">
                    <Link to='/games/week/1' className="inline">Games</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}