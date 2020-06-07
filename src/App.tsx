import React, { FC } from 'react';
import Board from './components/board/Board';
import Leaderboard from './components/leaderboard/Leaderboard';
import './App.scss';

const App: FC = () => {
    return (
        <div className="App">
            <Leaderboard />
            <Board />
        </div>
    );
};

export default App;
