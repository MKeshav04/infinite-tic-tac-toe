// In HowToPlayModal.js
import React from 'react';

function HowToPlayModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome to Infinite Tic-Tac-Toe!</h2>
        <p>The classic game of Tic-Tac-Toe often ends in a frustrating draw. This version introduces a unique twist to ensure a winner is always reached.</p>
        <h3>The Cyclic Rule</h3>
        <ul>
          <li>Each player can only have a maximum of **three** pieces on the board at any time.</li>
          <li>On a player's fourth move, their **oldest** piece is automatically removed to make way for the new one.</li>
        </ul>
        <p>This creates a dynamic, strategic game where the board is always changing. Good luck!</p>
        <button onClick={onClose}>Got it, Let's Play!</button>
      </div>
    </div>
  );
}

export default HowToPlayModal;