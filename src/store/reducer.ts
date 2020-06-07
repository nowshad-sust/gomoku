import { InitialStateType } from './types';
import {
    SET_BOARD_SIZE,
    SET_BOARD,
    SET_PLAYERS,
    SET_LEADERBOARD,
    SET_CURRENT_PLAYER,
    SET_IS_GAME_RUNNING,
    INCREMENT_CHECKED_BLOCKS,
    BOARD_SIZE,
    SET_WINNER,
} from './consts';

const initialState: InitialStateType = {
    boardSize: BOARD_SIZE,
    board: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(undefined)),
    players: {
        cross: '',
        circle: '',
    },
    currentPlayer: 1,
    isGameRunning: false,
    checkedBlocks: 0,
    winner: undefined,
    leaderboard: {
        cross: 0,
        circle: 0,
    },
};

const reducer = (state = initialState, action: { type: string; payload?: any }): InitialStateType => {
    switch (action.type) {
        case SET_BOARD_SIZE:
            return {
                ...state,
                boardSize: action.payload,
            };
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
        case SET_IS_GAME_RUNNING:
            return {
                ...state,
                isGameRunning: action.payload,
            };
        case INCREMENT_CHECKED_BLOCKS:
            return {
                ...state,
                checkedBlocks: state.checkedBlocks + 1,
            };
        case SET_WINNER:
            return {
                ...state,
                winner: action.payload,
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
