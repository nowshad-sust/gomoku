import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Circle, Cross } from '../Icons';
import { RootState } from '../../store/index';
import { setCurrentPlayer, setBoard, checkGame } from '../../store/actions';
import { RowType, ColType } from '../../store/types';
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

const Board: FC = () => {
    const { board, currentPlayer } = useSelector((state: RootState) => state);

    const checkBlock = (rowIndexParam: number, colIndexParam: number, player: number) => {
        setBoard(
            board.map((row: RowType, rowIndex: number) =>
                rowIndex === rowIndexParam
                    ? row.map((col: ColType, colIndex: number) => (colIndex === colIndexParam ? player : col))
                    : row,
            ),
        );
        checkGame(rowIndexParam, colIndexParam, currentPlayer);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
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
