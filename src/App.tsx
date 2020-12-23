import * as React from 'react';
import Board from './components/board/Board';
import Leaderboard from './components/leaderboard/Leaderboard';
import './App.scss';

const App: React.FC = () => {
    return (
        <div className="App">
            <Leaderboard />
            <Board />
        </div>
    );
};

export default App;
