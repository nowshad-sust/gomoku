export interface Players {
    cross: string;
    circle: string;
}

export type ColType = undefined | number; // player number
export type RowType = ColType[];
export type BoardType = RowType[];
export type Winner = undefined | number;

export type CurrentPlayer = number;
export type GameRunning = boolean;

export interface Leaderboard {
    cross: number;
    circle: number;
    draw: number;
}

export interface InitialStateType {
    board: BoardType;
    players: Players;
    currentPlayer: CurrentPlayer;
    isGameRunning: GameRunning;
    winner: Winner;
    leaderboard: Leaderboard;
}
