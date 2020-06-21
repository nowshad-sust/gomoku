import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGame, setIsGameRunning } from '../../store/gameReducer';
import { selectPlayer, setPlayers } from '../../store/playerReducer';
import { Cross, Circle } from '../Icons';
import './leaderboard.scss';

const Leaderboard: FC = () => {
    const [crossPlayer, setCrossPlayer] = useState('');
    const [circlePlayer, setCirclePlayer] = useState('');
    const { isGameRunning } = useSelector(selectGame);
    const dispatch = useDispatch();

    const {
        currentPlayer,
        players: { cross, circle },
        leaderboard: { cross: crossWin, circle: circleWin },
    } = useSelector(selectPlayer);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(
                setPlayers({
                    cross: crossPlayer,
                    circle: circlePlayer,
                }),
            );

            if (crossPlayer && circlePlayer) {
                dispatch(setIsGameRunning(true));
            }
        }
    };

    return (
        <div className="leaderboard">
            <div className="players">
                <div className={`player ${isGameRunning && currentPlayer === 1 ? 'active' : ''}`}>
                    <Circle />
                    {circle ? (
                        <div>
                            {circle}: {circleWin}
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setCirclePlayer(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </div>
                <div className={`player ${isGameRunning && currentPlayer === 2 ? 'active' : ''}`}>
                    <Cross />
                    {cross ? (
                        <div>
                            {cross}: {crossWin}
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setCrossPlayer(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
