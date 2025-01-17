import { Link } from "react-router";

import { selectCurrentPlayer } from "../stores/currentPlayerSlice";
import { useAppSelector } from "../stores/hooks";
import { Team } from "../stores/currentTeamSlice";

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

export default function NavPlayerCard() {

    const players = useAppSelector(selectCurrentPlayer);

    return (
        <main className="bg-slate-200 h-screen mt-3">
            {players.map((player: Player, index) => (
                <div key={index} className="mt-2 grid-rows-2 grid-cols-3 justify-self-center w-11/12">
                    <Link to={`${player.id}`}>
                        <div className="border border-black bg-cyan-500 text-slate-200
                                        p-1 grid text-center w-11/12 rounded-lg">
                            <div>
                                {player.first_name + " " +
                                player.last_name}
                            </div>
                            <div className="row-start-2 text-sm">Name</div>
                            <div>
                                {player.position}
                            </div>
                            <div className="row-start-2 text-sm">Position</div>
                            <div>
                            {player.team.full_name}
                            </div>
                            <div className="row-start-2 text-sm">Team</div>
                        </div>
                    </Link>
                </div>
            ))}
        </main>
        
    )
    
}