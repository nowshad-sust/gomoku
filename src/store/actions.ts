import { SET_BOARD, SET_PLAYERS, SET_LEADERBOARD, SET_CURRENT_PLAYER } from './consts';
import { Players, Leaderboard, CurrentPlayer, BoardType, RowType } from './types';
import store from './index';

export const checkGame = (rowIndexParam: number, colIndexParam: number, player: number) => {
    const board = store.getState().board;

    const isWinner = (row: RowType) => {
        const regex = new RegExp(`(${player}{5,5})`, 'gi');
        return regex.test(row.map((col) => col || 'x').join(''));
    };

    // horizontal
    const horizontalWin = isWinner(board[rowIndexParam]);

    // vertical
    const transposedColumn = board.map((x) => x[colIndexParam]);
    const verticalWin = isWinner(transposedColumn);

    // diagonal
    // find both of the diagonal array
    const diagonals = (row: number, col: number) => {
        const maxIndex = board.length - 1;
        let topLeftCol = 0;
        let topLeftRow = 0;
        let topRightCol = maxIndex;
        let topRightRow = 0;

        if (row + col < maxIndex) {
            topRightCol = row + col;
            topRightRow = 0;
        } else if (row + col > maxIndex) {
            topRightCol = maxIndex;
            topRightRow = col + row - maxIndex;
        }

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

        const rightToLeft = [];
        for (let i = 0; i <= maxIndex; i++) {
            if (topRightRow > maxIndex || topRightCol < 0) {
                break;
            }
            rightToLeft.push(board[topRightRow][topRightCol]);
            topRightRow += 1;
            topRightCol -= 1;
        }

        return { leftToRight, rightToLeft };
    };

    const { leftToRight, rightToLeft } = diagonals(rowIndexParam, colIndexParam);

    const leftToRightWin = isWinner(leftToRight);
    const rightToLeftWin = isWinner(rightToLeft);

    console.log({
        horizontalWin,
        verticalWin,
        diagonalWin: leftToRightWin || rightToLeftWin,
    });
};

export const setBoard = (payload: BoardType) => ({
    type: SET_BOARD,
    payload,
});

export const setPlayers = (payload: Players) => ({
    type: SET_PLAYERS,
    payload,
});

export const setCurrentPlayer = (payload: CurrentPlayer) => ({
    type: SET_CURRENT_PLAYER,
    payload,
});

export const setLeaderboard = (payload: Leaderboard) => ({
    type: SET_LEADERBOARD,
    payload,
});
