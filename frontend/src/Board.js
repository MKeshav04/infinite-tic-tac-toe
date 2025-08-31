import React, { useState, useEffect } from 'react';

// The Square component is perfect, no changes needed here.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// The Board component gets its final upgrade to talk to the API
function Board() {
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [message, setMessage] = useState('Click "New Game" to start!');

  // This special hook runs once when the component is first loaded
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    // Call our backend to create a new game
    const response = await fetch('http://127.0.0.1:8000/new-game', { method: 'POST' });
    const data = await response.json();
    setGameId(data.game_id);
    setSquares(Array(9).fill(''));
    setCurrentPlayer('X');
    setMessage(`Game ${data.game_id} started. Player X's turn.`);
  };

  const handleClick = async (i) => {
    // If there's already a winner or the square is filled, do nothing
    if (squares[i] || message.includes('wins!')) {
      return;
    }

    // Send the move to our backend API
    const response = await fetch(`http://127.0.0.1:8000/game/${gameId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ position: i + 1 }), // Convert JS object to JSON string
    });
    
    const data = await response.json();

    if (response.ok) {
      // If the move was successful, update the board with the backend's response
      setSquares(data.board.flat()); // .flat() converts the 2D array to a 1D array
      if (data.message.includes('wins!')) {
        setMessage(data.message);
      } else {
        setCurrentPlayer(data.current_player);
        setMessage(`Player ${data.current_player}'s turn.`);
      }
    } else {
      // If the API returned an error, show it
      setMessage(data.detail);
    }
  };

  return (
    <div>
      <div className="status">{message}</div>
      <div className="board">
        {/* We can now render the squares with a loop, which is cleaner */}
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <button className="new-game-button" onClick={startNewGame}>New Game</button>
    </div>
  );
}

export default Board;