export interface Players {
    cross: string;
    circle: string;
}

export type ColType = undefined | number; // player number
export type RowType = ColType[];
export type BoardType = RowType[];

export type CurrentPlayer = number;

export interface Leaderboard {
    cross: number;
    circle: number;
    draw: number;
}

export interface InitialStateType {
    board: BoardType;
    players: Players;
    currentPlayer: CurrentPlayer;
    leaderboard: Leaderboard;
}
