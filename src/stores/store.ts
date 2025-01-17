import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import teamsReducer from './TeamSlice'
import currentTeamReducer from './currentTeamSlice'
import currentPlayerReducer from './currentPlayerSlice'
import gameReducer from './GameSlice'

export const store = configureStore({
    reducer: {
        teams: teamsReducer,
        currentTeam: currentTeamReducer,
        currentPlayer: currentPlayerReducer,
        games: gameReducer,
    }
})

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>