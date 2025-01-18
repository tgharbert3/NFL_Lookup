import { Team } from "../stores/currentTeamSlice";


interface GameProps {
    home_team: Team;
    visitor_team: Team;
    home_score: number;
    visitor_score: number;
    summary: string;
    postseason: boolean;
}

export default function GamesGameCard({ home_team, visitor_team, home_score, visitor_score, summary, postseason }: GameProps) {

    if (postseason) {
        return (
            <div className="bg-cyan-500  border border-black rounded-lg w-4/5 flex flex-col items-center text-slate-200">
                 <div className="font-bold text-lg">{home_team.full_name}: {home_score}</div>
                 <div className="font-bold text-lg">{visitor_team.full_name}: {visitor_score} </div> 
                 <div>Summary: {summary}</div>
             </div> 
         )
    } else {
        return (
            <div className="bg-cyan-500  border border-black rounded-lg w-4/5 flex flex-col items-center text-slate-200">
                 <div className="font-bold text-lg">{home_team.full_name}: {home_score}</div>
                 <div className="font-bold text-lg">{visitor_team.full_name}: {visitor_score} </div> 
                 <div>Summary: {summary}</div>
             </div> 
         )
    }
}