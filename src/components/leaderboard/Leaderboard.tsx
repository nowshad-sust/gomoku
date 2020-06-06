import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cross, Circle, Equal } from '../Commons';
import { setPlayers } from '../../store/actions';

import './leaderboard.scss';
import { RootState } from '../../store/index';

const Leaderboard: FC = () => {
    const [crossPlayer, setCrossPlayer] = useState('');
    const [circlePlayer, setCirclePlayer] = useState('');
    const {
        currentPlayer,
        players: { cross, circle },
        leaderboard: { cross: crossWin, circle: circleWin, draw: drawn },
    } = useSelector((state: RootState) => state);
    const dispacth = useDispatch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispacth(
                setPlayers({
                    cross: crossPlayer,
                    circle: circlePlayer,
                }),
            );
        }
    };

    return (
        <div className="leaderboard">
            <div className="players">
                <div className={`player ${currentPlayer === 1 ? 'active' : ''}`}>
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
                <div className={`player ${currentPlayer === 2 ? 'active' : ''}`}>
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
                {cross && circle && (
                    <div className="player">
                        <Equal />
                        <div>Drawn: {drawn}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
