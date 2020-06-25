import { Players, CurrentPlayer, Winner, Leaderboard } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface PlayerState {
    players: Players;
    currentPlayer: CurrentPlayer;
    winner: Winner;
    leaderboard: Leaderboard;
}

const initialState: PlayerState = {
    players: {
        cross: undefined,
        circle: undefined,
    },
    currentPlayer: 1,
    winner: undefined,
    leaderboard: {
        cross: 0,
        circle: 0,
    },
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayers: (state, action: PayloadAction<Players>) => {
            state.players = action.payload;
        },
        setCurrentPlayer: (state, action: PayloadAction<CurrentPlayer>) => {
            state.currentPlayer = action.payload;
        },
        setWinner: (state, action: PayloadAction<Winner>) => {
            state.winner = action.payload;

            if (action.payload) {
                state.leaderboard = {
                    cross: action.payload === 2 ? state.leaderboard.cross + 1 : state.leaderboard.cross,
                    circle: action.payload === 1 ? state.leaderboard.circle + 1 : state.leaderboard.circle,
                };
            }
        },
        setLeaderboard: (state, action: PayloadAction<Leaderboard>) => {
            state.leaderboard = action.payload;
        },
    },
});

export const { setPlayers, setCurrentPlayer, setWinner, setLeaderboard } = playerSlice.actions;

export const selectPlayer = (state: RootState): PlayerState => state.player;
export default playerSlice.reducer;
