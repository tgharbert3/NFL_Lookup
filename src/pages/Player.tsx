import { useParams } from 'react-router';

import '../index.css'
import { selectCurrentPlayer, selectPlayerStatus } from "../stores/currentPlayerSlice"
import { useAppSelector } from "../stores/hooks"
import TitlePlayerCard from "../components/TitlePlayerCard";
import PlayerCard from '../components/PlayerCard';
import NavPlayerCard from '../components/NavPlayerCard';
import { Team } from '../stores/currentTeamSlice';
import Spinner from '../components/Spinner';

export interface Player {
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


export default function Player() {

    const currentPlayer = useAppSelector(selectCurrentPlayer);
    const playerStatus = useAppSelector(selectPlayerStatus);

    const { id } = useParams();

    if (id) {
        const playerData = currentPlayer[0];

        if (playerStatus === 'pending') {
            return <Spinner loading={true} />
        } else {
            return (
                <main className='grid grid-rows-2 h-screen'>
                    <TitlePlayerCard fullName={playerData.first_name + " " + playerData.last_name} />
                    <PlayerCard 
                        position={playerData.position} 
                        position_abbreviation={playerData.position_abbreviation}
                        height={playerData.weight}
                        weight={playerData.height}
                        jersey_number={playerData.jersey_number}
                        college={playerData.college}
                        experience={playerData.experience}
                        full_name={playerData.team.full_name}
                    />
                </main>
            )
        }
    } else {

        return (
           <NavPlayerCard />
        )
    }
    
}