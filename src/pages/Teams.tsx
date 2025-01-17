import { useParams, useNavigate } from "react-router"
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../stores/hooks";

import {    selectCurrentTeamConference, 
            selectCurrentTeamDivision, 
            selectCurrentTeamFullName, 
            selectCurrentTeamLoaction, 
            selectCurrentTeamName, 
            teamSet
        } from "../stores/currentTeamSlice";

import TitleCard from "../components/TitleGameCard";
import TeamCard from "../components/TeamCard";
import { fetchGameByID, gameSet } from "../stores/GameSlice";
import '../index.css';


export default function Team() {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const team = useAppSelector(state => state.teams.teams.find(team => String(team.id) === id))
    
    useEffect(() => {
        if (team) {
            dispatch(teamSet(team));
            if (id) {
                dispatch(fetchGameByID(id))
                        .then((response) => {
                            const gamesData = response.payload;
                            dispatch(gameSet(gamesData));
                        });
            }
            
        } else {
            navigate('/')
        }
    })
    
    const currentTeamFullName = useAppSelector(selectCurrentTeamFullName);
    const currentTeamConference = useAppSelector(selectCurrentTeamConference);
    const currentTeamDivision = useAppSelector(selectCurrentTeamDivision);
    const currentTeamLoaction = useAppSelector(selectCurrentTeamLoaction);
    const currentTeamName = useAppSelector(selectCurrentTeamName);

    if (id) {
        return (
            <main className="grid grid-rows-2 h-screen">
                <TitleCard fullName={currentTeamFullName} id={id}/>
                <TeamCard 
                    conference={currentTeamConference}
                    division={currentTeamDivision}
                    location={currentTeamLoaction}
                    name={currentTeamName}
                />
            </main>
                
        )
    }

}