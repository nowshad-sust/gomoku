import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Circle, Cross } from '../Icons';
import { startNewGame } from '../../store/actions';

const Overlay: FC = () => {
    const { isGameRunning, winner } = useSelector((state: RootState) => state);

    const winnerText = (
        <div className="winner-text">
            <div>
                {winner === 1 ? <Circle /> : <Cross />}
                <h3>Congratulations!!!</h3>
            </div>
            <p>You have just won the game!</p>
            <button onClick={startNewGame}>New Game</button>
        </div>
    );

    return (
        <div className={`overlay ${isGameRunning ? 'hide' : 'show'}`}>
            {!isGameRunning && !winner && <h3>Please enter player names to start the game</h3>}
            {winner && winnerText}
        </div>
    );
};

export default Overlay;
