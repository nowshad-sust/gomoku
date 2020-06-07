import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { Circle, Cross } from '../Commons';
import { newGame } from '../../store/actions';

const Overlay: FC = () => {
    const { isGameRunning, winner } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const winnerText = (
        <div className="winner-text">
            <div>
                {winner === 1 ? <Circle /> : <Cross />}
                <h3>Congratulations!!!</h3>
            </div>
            <button onClick={() => dispatch(newGame())}>New Game</button>
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
