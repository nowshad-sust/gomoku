import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RowType, ColType } from '../../store/types';
import { selectGame, setBoard, checkGame } from '../../store/gameReducer';
import { selectPlayer, setCurrentPlayer } from '../../store/playerReducer';
import { Circle, Cross } from '../Icons';
import Overlay from './Overlay';
import './board.scss';

type BlockProps = {
    player: number | undefined;
    onCheck: () => void;
};

const Block = ({ player, onCheck }: BlockProps) => {
    return (
        <div className={`block ${player ? 'checked' : ''}`} onClick={() => !player && onCheck()}>
            {player === 1 ? <Circle /> : player ? <Cross /> : ''}
        </div>
    );
};

const Board: React.FC = () => {
    const { board } = useSelector(selectGame);
    const { currentPlayer } = useSelector(selectPlayer);
    const dispatch = useDispatch();

    const checkBlock = (rowIndexParam: number, colIndexParam: number, player: number) => {
        dispatch(
            setBoard(
                board.map((row: RowType, rowIndex: number) =>
                    rowIndex === rowIndexParam
                        ? row.map((col: ColType, colIndex: number) => (colIndex === colIndexParam ? player : col))
                        : row,
                ),
            ),
        );
        dispatch(checkGame(rowIndexParam, colIndexParam, currentPlayer));
        dispatch(setCurrentPlayer(currentPlayer === 1 ? 2 : 1));
    };

    const grid = board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
            {row.map((col: ColType, colIndex: number) => (
                <Block
                    key={`block ${rowIndex}-${colIndex}`}
                    player={col}
                    onCheck={() => checkBlock(rowIndex, colIndex, currentPlayer)}
                />
            ))}
        </div>
    ));

    return (
        <div className="board">
            <div className="grid">{grid}</div>
            <Overlay />
        </div>
    );
};

export default Board;
