import TeamGameCard from "../components/TeamGameCard";
import GamesGameCard from "../components/GamesGameCard";
import { useParams } from "react-router";
import { useAppSelector } from "../stores/hooks";
import { selectGames } from "../stores/GameSlice";
 import "../index.css"



export default function Game() {

    const games = useAppSelector(selectGames);

    const { id } = useParams();
            
    if (id) {
        return (
            <div className="h-full">
                {games.map(game => {
                    if (String(game.home_team.id) === id) {
                        const clickTeam = game.home_team;
                        const otherTeam = game.visitor_team;
                        return <div key={game.id} className="m-3 flex justify-center">
                        <TeamGameCard 
                            week={game.week} 
                            top_team={clickTeam} 
                            bottom_team={otherTeam} 
                            home_score={game.home_team_score} 
                            visitor_score={game.visitor_team_score}
                            summary={game.summary}
                            postseason={game.postseason}
                        />
                    </div>
                    } else {
                        const clickTeam = game.visitor_team;
                        const otherTeam = game.home_team;
                        return <div key={game.id} className="m-3 flex justify-center">
                        <TeamGameCard 
                            week={game.week} 
                            top_team={clickTeam} 
                            bottom_team={otherTeam} 
                            home_score={game.home_team_score} 
                            visitor_score={game.visitor_team_score}
                            summary={game.summary}
                            postseason={game.postseason}
                        />
                    </div>
                    }
                
            })}
            </div>
        )
    } else {
        console.log(games)
        return (
            <div className="h-full">
                {games.map(game => {
                return <div key={game.id} className="m-3 flex justify-center">
                        <GamesGameCard 
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
    }  
}