import React, { useState } from 'react'
import './menu.styles.css'
import { Button, Typography } from '@mui/material'
const Menu = () => {
  return (
    <>
      <div className="menu">
        <div className="header">
          <Typography variant="h1">Player vs Player</Typography>
        </div>
        <div className="rules">
          <Typography variant="h5">Rules</Typography>
          <Typography variant="p">Game rules</Typography>
        </div>
        <div className="objective">
          <Typography variant="h5">Objective</Typography>
          <Typography variant="p">
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </Typography>
        </div>
        <div className="btns">
          <Button variant="contained" color="playBtn" href="/play/vs/local">
            Local
          </Button>
          <Button variant="contained" color="playBtn" href="/play/vs/computer">
            Player vs Computer
          </Button>
        </div>
      </div>
    </>
  )
}

export default Menu
