import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./withTypes";

import { Team } from "./currentTeamSlice";
import { RootState } from "./store";

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

interface PlayerState {
    player: Player[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null | string
}

const initialState: PlayerState = {
    player: [],
    status: 'idle',
    error: null,
}

export const fetchPlayer = createAppAsyncThunk('player/fetchPlayer', async (names: string[]) => {

    const response = await fetch(`https://api.balldontlie.io/nfl/v1/players/?first_name=${names[0]}&last_name=${names[1]}`, {
        headers: {
            Authorization: import.meta.env.VITE_API_KEY,
        }
    });
    const responseJSON = await response.json()
    const result = responseJSON.data;
    return result
})

export const CurrentPlayerSlice = createSlice({
    name: 'currentPlayer',
    initialState,
    reducers: {
        playerSet: (state, action: PayloadAction<Player[]>) => {
            state.player = action.payload;
        },
        playerReset: (state) => {
            state.player = initialState.player;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPlayer.pending, (state) => {
                state.status= 'pending'
            })
            .addCase(fetchPlayer.fulfilled, (state, action) => {
                state.player.push(...action.payload)
                state.status = 'succeeded'
            })
            .addCase(fetchPlayer.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export const { playerSet, playerReset } = CurrentPlayerSlice.actions;
export default CurrentPlayerSlice.reducer;

export const selectPlayerStatus = (state: RootState) => state.currentPlayer.status;
export const selectCurrentPlayer= (state: RootState) => state.currentPlayer.player