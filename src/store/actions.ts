import {
    SET_BOARD,
    SET_PLAYERS,
    SET_LEADERBOARD,
    SET_CURRENT_PLAYER,
    SET_IS_GAME_RUNNING,
    INCREMENT_CHECKED_BLOCKS,
    SET_WINNER,
} from './consts';
import { Players, Leaderboard, CurrentPlayer, BoardType, RowType, Winner, GameRunning, BoardSize } from './types';
import store from './index';
import { SET_BOARD_SIZE } from './consts';

const { dispatch, getState } = store;

export const checkGame = (rowIndexParam: number, colIndexParam: number, player: number) => {
    dispatch(incrementCheckedBlocks());

    const { board, boardSize, checkedBlocks } = getState();

    const isWinner = (row: RowType) => {
        const regex = new RegExp(`(${player}{5,5})`, 'gi');
        return regex.test(row.map((col) => col || 'x').join(''));
    };

    // horizontal
    if (isWinner(board[rowIndexParam])) {
        dispatch(setIsGameRunning(false));
        return dispatch(setWinner(player));
    }

    // vertical
    const transposedColumn = board.map((x) => x[colIndexParam]);
    if (isWinner(transposedColumn)) {
        dispatch(setIsGameRunning(false));
        return dispatch(setWinner(player));
    }

    // top-left to bottom-right
    const TL2BR = (row: number, col: number) => {
        const maxIndex = board.length - 1;
        let topLeftCol = 0;
        let topLeftRow = 0;

        if (row > col) {
            topLeftCol = 0;
            topLeftRow = row - col;
        } else if (col > row) {
            topLeftCol = col - row;
            topLeftRow = 0;
        }

        const leftToRight = [];
        for (let i = 0; i <= maxIndex; i++) {
            if (topLeftRow > maxIndex || topLeftCol > maxIndex) {
                break;
            }
            leftToRight.push(board[topLeftRow][topLeftCol]);
            topLeftRow += 1;
            topLeftCol += 1;
        }

        return leftToRight;
    };

    if (isWinner(TL2BR(rowIndexParam, colIndexParam))) {
        dispatch(setIsGameRunning(false));
        return dispatch(setWinner(player));
    }

    // top-right to bottom-left
    const TR2BL = (row: number, col: number) => {
        const maxIndex = board.length - 1;
        let topRightCol = maxIndex;
        let topRightRow = 0;

        if (row + col < maxIndex) {
            topRightCol = row + col;
            topRightRow = 0;
        } else if (row + col > maxIndex) {
            topRightCol = maxIndex;
            topRightRow = col + row - maxIndex;
        }

        const rightToLeft = [];
        for (let i = 0; i <= maxIndex; i++) {
            if (topRightRow > maxIndex || topRightCol < 0) {
                break;
            }
            rightToLeft.push(board[topRightRow][topRightCol]);
            topRightRow += 1;
            topRightCol -= 1;
        }

        return rightToLeft;
    };

    if (isWinner(TR2BL(rowIndexParam, colIndexParam))) {
        dispatch(setIsGameRunning(false));
        return dispatch(setWinner(player));
    }

    // increase the board size when the board is almost full
    if (checkedBlocks === boardSize * (boardSize - 1)) {
        dispatch(increateBoardSize(boardSize + 5));

        // increase board by 5 rows
        const newRows = Array(5).fill(Array(boardSize + 5).fill(undefined));
        const newBoard = [...board.map((row) => [...row, ...Array(5).fill(undefined)]), ...newRows];

        dispatch(setBoard(newBoard));
    }
};

export const setBoard = (payload: BoardType) => ({
    type: SET_BOARD,
    payload,
});

export const increateBoardSize = (payload: BoardSize) => ({
    type: SET_BOARD_SIZE,
    payload,
});

export const setPlayers = (payload: Players) => {
    dispatch({
        type: SET_PLAYERS,
        payload,
    });
    if (payload.cross && payload.circle) {
        dispatch(setIsGameRunning(true));
    }
};

export const setCurrentPlayer = (payload: CurrentPlayer) => ({
    type: SET_CURRENT_PLAYER,
    payload,
});

export const setLeaderboard = (payload: Leaderboard) => ({
    type: SET_LEADERBOARD,
    payload,
});

export const setIsGameRunning = (payload: GameRunning) => ({
    type: SET_IS_GAME_RUNNING,
    payload,
});

export const setWinner = (payload: Winner) => ({
    type: SET_WINNER,
    payload,
});

export const incrementCheckedBlocks = () => ({
    type: INCREMENT_CHECKED_BLOCKS,
});
