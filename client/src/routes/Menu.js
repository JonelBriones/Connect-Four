import React from 'react'
// import './menu.styles.css'
import { Button, Typography, Container } from '@mui/material'
const Menu = () => {
  return (
    <>
      {/* <!-- Main menu start --> */}
      {/* <Container> */}
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
        <Button variant="contained" color="playBtn" href="/play">
          Click to play!
        </Button>
      </div>
      {/* </Container> */}
    </>
  )
}

export default Menu
