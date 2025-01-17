import { useAppSelector } from "../stores/hooks";
import { selectGames } from "../stores/GameSlice"
import GameCard from "../components/GameCard";
import { useParams } from "react-router";



export default function Game() {

    const games = useAppSelector(selectGames)

    const { id } = useParams();
            
    if (id) {
        return (
            <div className="h-full">
                {games.map(game => {
                return <div key={game.id} className="m-3 flex justify-center">
                        <GameCard 
                            week={game.week} 
                            home_team={game.home_team} 
                            visitor_team={game.visitor_team} 
                            home_score={game.home_team_score} 
                            visitor_score={game.visitor_team_score}
                            summary={game.summary}
                            postseason={game.postseason}
                        />
                    </div>
            })}
            </div>
        )
    } else {
        return(
            <div>no ID</div>
        )
    }
    
}