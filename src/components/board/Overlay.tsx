import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Circle, Cross } from '../Commons';

const Overlay: FC = () => {
    const { isGameRunning, winner } = useSelector((state: RootState) => state);

    const winnerText = (
        <div className="winner-text">
            {winner === 1 ? <Circle /> : <Cross />}
            <h3>Congratulations!!!</h3>
        </div>
    );
    return (
        <div className={`overlay ${isGameRunning ? 'hide' : 'show'}`}>
            {!isGameRunning && !winner && 'Please enter player names to start the game'}
            {winner && winnerText}
        </div>
    );
};

export default Overlay;
