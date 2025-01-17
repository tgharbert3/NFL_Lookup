import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

export interface Team {
    id: number | null;
    conference: string;
    division: string;
    location: string;
    name: string;
    full_name: string;
    abbreviation: string;
};


export const initialState: Team = {
    id: null,
    conference: '',
    division: '',
    location: '',
    name: '',
    full_name: '',
    abbreviation: '',
};

export const CurrentTeamSlice = createSlice( {
    name: 'currentTeamSlice',
    initialState,
    reducers: {
        teamSet: (state, action: PayloadAction<Team>) => {
            state.id = action.payload.id
            state.conference = action.payload.conference
            state.division = action.payload.division
            state.location = action.payload.location
            state.name = action.payload.name
            state.full_name = action.payload.full_name
        }
    }
});

export const { teamSet } = CurrentTeamSlice.actions;
export default CurrentTeamSlice.reducer;

export const selectCurrentTeamID = (state: RootState) => state.currentTeam.id;
export const selectCurrentTeamConference = (state: RootState) => state.currentTeam.conference;
export const selectCurrentTeamDivision = (state: RootState) => state.currentTeam.division;
export const selectCurrentTeamLoaction= (state: RootState) => state.currentTeam.location;
export const selectCurrentTeamName = (state: RootState) => state.currentTeam.name;
export const selectCurrentTeamFullName = (state: RootState) => state.currentTeam.full_name;