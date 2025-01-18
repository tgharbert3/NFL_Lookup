import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import API_KEY from "../services/api";
import { createAppAsyncThunk } from "./withTypes";
import { Team } from "./currentTeamSlice";
import { RootState } from "./store";

export interface game {
    id: number | null;
    visitor_team: Team;
    home_team: Team;
    summary: string;
    venue: string;
    week: number;
    date: string;
    season: number;
    postseason: boolean;
    status: string;
    home_team_score: number;
    home_team_q1: number;
    home_team_q2: number;
    home_team_q3: number;
    home_team_q4: number;
    home_team_ot: number | null;
    visitor_team_score: number;
    visitor_team_q1: number;
    visitor_team_q2: number;
    visitor_team_q3: number;
    visitor_team_q4: number;
    visitor_team_ot: number | null;
}

interface GameState {
    games: game[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null; 
}

export const initialState: GameState = {
    games: [],
    status: 'idle',
    error: null
}


export const fetchGameByWeek = createAppAsyncThunk('game/fetchGame', async (week: string) => {

    const response = await fetch(`https://api.balldontlie.io/nfl/v1/games?seasons[]=2024&weeks[]=${week}&postseason=false`, {
        headers: {
            Authorization: API_KEY,
        }
    });
    const responseJSON =  await response.json();
    return responseJSON;
})

export const fetchGameByID = createAppAsyncThunk('game/fetchGameByID', async (id: string) => {

    const response = await fetch(`https://api.balldontlie.io/nfl/v1/games?seasons[]=2024&team_ids[]=${id}`, {
        headers: {
            Authorization: API_KEY,
        }
    });
    const responseJSON =  await response.json();
    const result = responseJSON.data
    return result
})


export const GameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        gameSet: (state, action: PayloadAction<game[]>) => {
            state.games = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGameByWeek.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchGameByWeek.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(fetchGameByWeek.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export default GameSlice.reducer;
export const { gameSet } = GameSlice.actions;

export const selectGames= (state: RootState) => state.games.games;
export const selectGamesStatus = (state: RootState) => state.games.status;