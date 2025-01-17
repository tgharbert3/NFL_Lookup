import { useEffect } from "react";
import { Link } from "react-router";

import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { fetchTeams, teamAdded, selectAllTeams, selectTeamStatus } from "../stores/TeamSlice";
import '../index.css'


interface Team {
    id: number;
    conference: string;
    division: string;
    location: string;
    name: string;
    full_name: string;
    abbreviation: string;
}

const afcNorth: Team[] = [];
const afcSouth: Team[] = [];
const afcWest: Team[] = [];
const afcEast: Team[] = [];
const nfcNorth: Team[] = [];
const nfcSouth: Team[] = [];
const nfcWest: Team[] = [];
const nfcEast: Team[] = [];

const Home = ()  => {

    const dispatch = useAppDispatch();
    const allTeams = useAppSelector(selectAllTeams);
    const teamStatus = useAppSelector(selectTeamStatus);

    useEffect(() => {
        async function getTeams() {
            if (teamStatus === 'idle') {
                const response = await dispatch(fetchTeams());
                const teams = response.payload;
                if (teams) {
                    dispatch(teamAdded(teams))
                }
            }    
        }
        getTeams();
        if (afcNorth.length < 4) {
            allTeams.filter((team: Team) => {
                if (team.conference === 'AFC' && team.division === "NORTH") {
                    afcNorth.push(team)
                }
                if (team.conference === 'AFC' && team.division === "SOUTH") {
                    afcSouth.push(team)
                }
                if (team.conference === 'AFC' && team.division === "WEST") {
                    afcWest.push(team)
                }
                if (team.conference === 'AFC' && team.division === "EAST") {
                    afcEast.push(team)
                }
                if (team.conference === 'NFC' && team.division === "NORTH") {
                    nfcNorth.push(team)
                }
                if (team.conference === 'NFC' && team.division === "SOUTH") {
                    nfcSouth.push(team)
                }
                if (team.conference === 'NFC' && team.division === "WEST") {
                    nfcWest.push(team)
                }
                if (team.conference === 'NFC' && team.division === "EAST") {
                    nfcEast.push(team)
                }
            })
        }
        
    }, [dispatch, teamStatus])

     return (
        <main className="mt-6 h-screen">
            <section className="grid grid-cols-2 grid-rows-2 gap-6 m-3">
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                    <div className="col-span-2 text-center text-2xl mb-3">AFC North</div>
                    {afcNorth.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">AFC South</div>
                    {afcSouth.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">AFC East</div>
                    {afcEast.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">AFC West</div>
                    {afcWest.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
            </section>
            <section className="grid grid-cols-2 grid-rows-2 gap-6 mt-12 mr-3 ml-3 ">
            <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
            <div className="col-span-2 text-center text-2xl mb-3">NFC North</div>
                    {nfcNorth.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">NFC South</div>
                    {nfcSouth.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">NFC East</div>
                    {nfcEast.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
                <div className="grid grid-rows-3 grid-cols-2 bg-cyan-500 rounded-xl text-slate-200 border border-black">
                <div className="col-span-2 text-center text-2xl">NFC West</div>
                    {nfcWest.map((team: Team, index) => {
                        return <Link to={`/teams/${team.location}/${team.name}/${team.id}`} key={index} className="text-center text-xl">{team.full_name}</Link>
                    })}
                </div>
            </section>
        </main>
    )
}

export default Home;