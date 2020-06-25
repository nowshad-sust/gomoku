import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardType, BoardSize, GameRunning, CheckedBlock, Winner, RowType } from './types';
import { AppThunk, AppDispatch, RootState } from './index';
import { BOARD_SIZE, INCREASE_BY } from './consts';
import { setWinner } from './playerReducer';

interface GameState {
    boardSize: number;
    board: BoardType;
    isGameRunning: boolean;
    checkedBlocks: number;
}

const initialState: GameState = {
    boardSize: BOARD_SIZE,
    board: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(undefined)),
    isGameRunning: false,
    checkedBlocks: 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBoardSize: (state, action: PayloadAction<BoardSize>) => {
            state.boardSize = action.payload;
        },
        increaseBoardSize: (state) => {
            state.boardSize = state.boardSize + INCREASE_BY * 2;
        },
        setBoard: (state, action: PayloadAction<BoardType>) => {
            state.board = action.payload;
        },
        setIsGameRunning: (state, action: PayloadAction<GameRunning>) => {
            state.isGameRunning = action.payload;
        },
        setCheckedBlocks: (state, action: PayloadAction<CheckedBlock>) => {
            state.checkedBlocks = action.payload;
        },
        incrementCheckedBlocks: (state) => {
            state.checkedBlocks = state.checkedBlocks + 1;
        },
        resetGame: (state) => {
            state.boardSize = BOARD_SIZE;
            state.board = initialState.board;
            state.isGameRunning = true;
            state.checkedBlocks = 0;
        },
    },
});

export const {
    setBoardSize,
    increaseBoardSize,
    setBoard,
    setCheckedBlocks,
    incrementCheckedBlocks,
    setIsGameRunning,
    resetGame,
} = gameSlice.actions;

export const startNewGame = (): AppThunk => (dispatch: AppDispatch): void => {
    dispatch(resetGame());
    dispatch(setWinner(undefined));
};

export const gameOver = (winner: Winner): AppThunk => (dispatch: AppDispatch): void => {
    dispatch(setIsGameRunning(false));
    dispatch(setWinner(winner));
};

export const checkGame = (rowIndexParam: number, colIndexParam: number, player: number): AppThunk => (
    dispatch: AppDispatch,
    getState: () => RootState,
): any => {
    dispatch(incrementCheckedBlocks());

    const {
        game: { board, boardSize, checkedBlocks },
    } = getState();

    const isWinner = (row: RowType) => {
        const regex = new RegExp(`(${player}{5,5})`, 'gi');
        return regex.test(row.map((col) => col || 'x').join(''));
    };

    // horizontal
    if (isWinner(board[rowIndexParam])) {
        return dispatch(gameOver(player));
    }

    // vertical
    const transposedColumn = board.map((x) => x[colIndexParam]);
    if (isWinner(transposedColumn)) {
        return dispatch(gameOver(player));
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
        return dispatch(gameOver(player));
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
        return dispatch(gameOver(player));
    }

    // increase the board size when the board is almost full
    if (checkedBlocks === boardSize * (boardSize - 1)) {
        // increase board on all four side
        const newCols = Array(INCREASE_BY).fill(undefined);
        const newRows = Array(INCREASE_BY).fill(Array(boardSize + INCREASE_BY * 2).fill(undefined));
        const newBoard = [...newRows, ...board.map((row) => [...newCols, ...row, ...newCols]), ...newRows];

        dispatch(increaseBoardSize());
        return dispatch(setBoard(newBoard));
    }
};

export const selectGame = (state: RootState): GameState => state.game;
export default gameSlice.reducer;
