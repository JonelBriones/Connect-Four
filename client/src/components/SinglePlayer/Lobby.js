import React, { useState } from 'react'
import { Button } from '@mui/material'
import Board from '../board/Board'
const Lobby = () => {
  return (
    <div>
      <Button variant="contained" color="success" href="/">
        Go back to menu
      </Button>
      <div className="board-container">
        <div className="player-card one">
          <h4>Player 1</h4>
          <h3>0</h3>
        </div>
        <Board />
        <div className="player-card two">
          <h4>Player 2</h4>
          <h3>0</h3>
        </div>
      </div>
      {/* 
      <!-- Ingame menu start -->

  Pause

  Continue game
  Restart
  Quit game

  <!-- Ingame menu end -->
  
  <!-- Game board start -->

  Menu
  Restart

  Player 1
  Player 2

  Player 1's turn
  Player 2's turn

  Wins
  Play again

  <!-- Game board end --> */}
    </div>
  )
}

export default Lobby
