import React, { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// The Board component receives its final AI-powered upgrade
function Board({ gameMode }) { // Receive gameMode as a prop
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [message, setMessage] = useState('Click "New Game" to start!');

  useEffect(() => {
    startNewGame();
  }, [gameMode]); // Re-start a new game if the mode changes

  const startNewGame = async () => {
    const response = await fetch('http://127.0.0.1:8000/new-game', { method: 'POST' });
    const data = await response.json();
    setGameId(data.game_id);
    setSquares(Array(9).fill(''));
    setCurrentPlayer('X');
    setMessage(`The battle begins! Player X to move.`);
  };

  const handleClick = async (i) => {
    if (squares[i] || message.includes('wins!')) {
      return;
    }

    // --- Human's Move ---
    const humanResponse = await fetch(`http://127.0.0.1:8000/game/${gameId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position: i + 1 }),
    });
    
    const humanData = await humanResponse.json();

    if (humanResponse.ok) {
      setSquares(humanData.board.flat());
      if (humanData.message.includes('wins!')) {
        setMessage(humanData.message);
        return; // Stop if the human wins
      }
      setCurrentPlayer(humanData.current_player);
      setMessage(`Player ${humanData.current_player}'s turn.`);

      // --- NEW: AI's Turn ---
      // If the game mode is 'ai' and it's now O's turn
      if (gameMode === 'ai' && humanData.current_player === 'O') {
        setMessage('AI is thinking...');
        // Call the AI endpoint
        const aiResponse = await fetch(`http://127.0.0.1:8000/game/${gameId}/ai-move`);
        const aiData = await aiResponse.json();

        if (aiResponse.ok) {
          setSquares(aiData.board.flat());
          if (aiData.message.includes('wins!')) {
            setMessage(aiData.message);
          } else {
            setCurrentPlayer(aiData.current_player);
            setMessage(`Player ${aiData.current_player}'s turn.`);
          }
        }
      }
    } else {
      setMessage(humanData.detail);
    }
  };

  return (
    <div>
      <div className="status">{message}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <button className="new-game-button" onClick={startNewGame}>New Game</button>
    </div>
  );
}

export default Board;