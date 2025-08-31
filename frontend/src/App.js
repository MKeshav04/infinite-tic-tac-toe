import React, { useState } from 'react';
import './App.css';
import Board from './Board.js';
import HowToPlayModal from './HowToPlayModal.js'; // The new modal component we created

function App() {
  // State to track which game mode is selected
  const [gameMode, setGameMode] = useState(null); // 'player' or 'ai'

  // NEW: State to control the modal's visibility. It starts as 'true'
  // so the rules pop up automatically on the first visit.
  const [isModalOpen, setIsModalOpen] = useState(true);

  // If no game mode is selected yet, show the main menu
  if (!gameMode) {
    return (
      <div className="App">
        {/* This line conditionally renders the modal */}
        {isModalOpen && <HowToPlayModal onClose={() => setIsModalOpen(false)} />}

        <button className="how-to-play-button" onClick={() => setIsModalOpen(true)}>?</button>
        
        <h1>Infinite Tic-Tac-Toe</h1>
        <h2>Choose a Game Mode:</h2>
        <div className="game-mode">
          <button onClick={() => setGameMode('player')}>Player vs. Player</button>
          <button onClick={() => setGameMode('ai')}>Player vs. AI</button>
        </div>
      </div>
    );
  }

  // If a game mode IS selected, show the game board
  return (
    <div className="App">
      {/* The modal and button are here too, so the user can check the rules during a game */}
      {isModalOpen && <HowToPlayModal onClose={() => setIsModalOpen(false)} />}
      <button className="how-to-play-button" onClick={() => setIsModalOpen(true)}>?</button>

      <h1>Infinite Tic-Tac-Toe</h1>
      <Board gameMode={gameMode} />
      <button className="back-button" onClick={() => setGameMode(null)}>Back to Menu</button>
    </div>
  );
}

export default App;
