import { InitialStateType } from './types';
import { SET_BOARD, SET_PLAYERS, SET_LEADERBOARD, SET_CURRENT_PLAYER, BOARD_SIZE } from './consts';

const initialState: InitialStateType = {
    board: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(undefined)),
    players: {
        cross: '',
        circle: '',
    },
    currentPlayer: 1,
    leaderboard: {
        cross: 0,
        circle: 0,
        draw: 0,
    },
};

const reducer = (state = initialState, action: { type: string; payload: any }): InitialStateType => {
    switch (action.type) {
        case SET_BOARD:
            return {
                ...state,
                board: action.payload,
            };
        case SET_PLAYERS:
            return {
                ...state,
                players: action.payload,
            };
        case SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayer: action.payload,
            };
        case SET_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
