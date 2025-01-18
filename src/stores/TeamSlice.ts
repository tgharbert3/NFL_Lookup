import { createSlice, PayloadAction} from '@reduxjs/toolkit';

import { RootState } from './store';
import { createAppAsyncThunk } from './withTypes';



export interface Team {
    id: number;
    conference: string;
    division: string;
    location: string;
    name: string;
    full_name: string;
    abbreviation: string;
}

interface TeamState {
    teams: Team[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;
}

export const initialState: TeamState = {
    teams: [],
    status: 'idle',
    error: null
}

export const fetchTeams = createAppAsyncThunk('teams/fetchTeams', async () => {
    const response = await fetch("https://api.balldontlie.io/nfl/v1/teams", {
        headers: {
            Authorization: import.meta.env.VITE_API_KEY,
        }
    });
    const responseJSON = await response.json()
    const result = responseJSON.data;
    return result
},
{
    condition(_arg, thunkApi) {
        const teamStatus = selectTeamStatus(thunkApi.getState())
        if (teamStatus !== 'idle') {
            return false
        }
    }
})

export const TeamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        teamAdded(state, action: PayloadAction<Team[]>) {
            state.teams = action.payload
        },   
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.status= 'pending'
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams.push(...action.payload)
                state.status = 'succeeded'
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export const { teamAdded } = TeamSlice.actions;
export default TeamSlice.reducer

export const selectAllTeams = (state: RootState) => state.teams.teams
export const selectTeamStatus = (state: RootState) => state.teams.status

