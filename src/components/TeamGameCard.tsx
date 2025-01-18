import { Team } from "../stores/currentTeamSlice";

interface GameProps {
    week: number;
    top_team: Team;
    bottom_team: Team;
    home_score: number;
    visitor_score: number;
    summary: string;
    postseason: boolean;
}

export default function GameCard({ week, top_team, bottom_team, home_score, visitor_score, summary, postseason }: GameProps) {

    if (postseason) {
        return (
            <div className="bg-cyan-500  border border-black rounded-lg w-4/5 flex flex-col items-center text-slate-200">
                 <div className="text-center font-bold text-lg" >Playoff Week {week} </div> 
                 <div>{top_team.full_name}: {home_score}</div>
                 <div>{bottom_team.full_name}: {visitor_score} </div> 
                 <div>Summary: {summary}</div>
             </div> 
         )
    } else {
        return (
            <div className="bg-cyan-500  border border-black rounded-lg w-4/5 flex flex-col items-center text-slate-200">
                 <div className="text-center font-bold text-lg" >Week {week} </div> 
                 <div className="font-bold">{top_team.full_name}: {home_score}</div>
                 <div>{bottom_team.full_name}: {visitor_score} </div> 
                 <div>Summary: {summary}</div>
             </div> 
         )
    }
}