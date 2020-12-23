import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Circle, Cross } from '../Icons';
import { selectGame, startNewGame } from '../../store/gameReducer';
import { selectPlayer } from '../../store/playerReducer';

const Overlay: React.FC = () => {
    const { isGameRunning } = useSelector(selectGame);
    const { winner } = useSelector(selectPlayer);
    const dispatch = useDispatch();

    const winnerText = (
        <div className="winner-text">
            <div>
                {winner === 1 ? <Circle /> : <Cross />}
                <h3>Congratulations!!!</h3>
            </div>
            <p>You have just won the game!</p>
            <button onClick={() => dispatch(startNewGame())}>New Game</button>
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
