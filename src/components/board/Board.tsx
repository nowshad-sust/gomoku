import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './board.scss';
import { Circle, Cross } from '../Commons';
import { RootState } from '../../store/index';
import { setCurrentPlayer, setBoard, checkGame } from '../../store/actions';
import { RowType, ColType } from '../../store/types';
import Overlay from './Overlay';

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

const Board: FC = () => {
    const { board, currentPlayer } = useSelector((state: RootState) => state);
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
        checkGame(rowIndexParam, colIndexParam, currentPlayer);
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
