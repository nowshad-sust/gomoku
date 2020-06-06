import React, { FC } from 'react';
import './App.scss';
import Board from './components/board/Board';
import Leaderboard from './components/leaderboard/Leaderboard';

const App: FC = () => {
    return (
        <div className="App">
            <Leaderboard />
            <Board />
        </div>
    );
};

export default App;
