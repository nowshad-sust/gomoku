export interface Players {
    cross: string;
    circle: string;
}

export type ColType = undefined | number; // player number
export type RowType = ColType[];
export type BoardType = RowType[];
export type Winner = undefined | number;
export type CheckedBlock = number;
export type BoardSize = number;

export type CurrentPlayer = number;
export type GameRunning = boolean;

export interface Leaderboard {
    cross: number;
    circle: number;
}

export interface InitialStateType {
    boardSize: BoardSize;
    board: BoardType;
    players: Players;
    currentPlayer: CurrentPlayer;
    isGameRunning: GameRunning;
    checkedBlocks: CheckedBlock;
    winner: Winner;
    leaderboard: Leaderboard;
}
