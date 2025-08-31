import React, { useState } from 'react';
import './App.css';
import Board from './Board.js';

function App() {
  // State to track which game mode is selected
  const [gameMode, setGameMode] = useState(null); // 'player' or 'ai'

  // If no game mode is selected yet, show the menu
  if (!gameMode) {
    return (
      <div className="App">
        <h1>Infinite Tic-Tac-Toe</h1>
        <h2>Choose a Game Mode:</h2>
        <div className="game-mode">
          <button onClick={() => setGameMode('player')}>Player vs. Player</button>
          <button onClick={() => setGameMode('ai')}>Player vs. AI</button>
        </div>
      </div>
    );
  }

  // If a game mode IS selected, show the board
  return (
    <div className="App">
      <h1>Infinite Tic-Tac-Toe</h1>
      {/* We'll need to update the Board component to know about the game mode */}
      <Board gameMode={gameMode} />
      <button className="back-button" onClick={() => setGameMode(null)}>Back to Menu</button>
    </div>
  );
}

export default App;