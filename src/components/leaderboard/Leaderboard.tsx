import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Cross, Circle } from '../Icons';
import { RootState } from '../../store/index';
import { setPlayers } from '../../store/actions';

import './leaderboard.scss';

const Leaderboard: FC = () => {
    const [crossPlayer, setCrossPlayer] = useState('');
    const [circlePlayer, setCirclePlayer] = useState('');
    const {
        currentPlayer,
        isGameRunning,
        players: { cross, circle },
        leaderboard: { cross: crossWin, circle: circleWin },
    } = useSelector((state: RootState) => state);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setPlayers({
                cross: crossPlayer,
                circle: circlePlayer,
            });
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
