import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { FaRegHandPointer } from 'react-icons/fa'
import BoardOnClick from './BoardOnClick'
import { defaultBoard, ROW_LENGTH } from './defaultBoard'
import {
  COLUMN_1,
  COLUMN_2,
  COLUMN_3,
  COLUMN_4,
  COLUMN_5,
  COLUMN_6,
  COLUMN_7,
} from './rows'
import { HORIZONTAL_WINS } from './winPatterns'
const Board = () => {
  const [board, setBoard] = useState(defaultBoard)
  const [result, setResult] = useState({})
  const [color, setColor] = useState('yellow')
  const [winHistory, setWinHistory] = useState({
    playerOne: 0,
    playerTwo: 0,
  })
  const [onHover, setOnHovering] = useState()
  useEffect(() => {
    checkWin()
    if (color === 'red') {
      setColor('yellow')
    }
    if (color === 'yellow') {
      setColor('red')
    }
  }, [board])
  const chooseColumn = (num) => {
    if (COLUMN_1.includes(num)) {
      console.log('it contains numbers from column 1')
      choose(COLUMN_1, num)
    }
    if (COLUMN_2.includes(num)) {
      console.log('it contains numbers from column 2')
      choose(COLUMN_2, num)
    }
    if (COLUMN_3.includes(num)) {
      console.log('it contains numbers from column 3')
      choose(COLUMN_3, num)
    }
    if (COLUMN_4.includes(num)) {
      console.log('it contains numbers from column 4')
      choose(COLUMN_4, num)
    }
    if (COLUMN_5.includes(num)) {
      console.log('it contains numbers from column 5')
      choose(COLUMN_5, num)
    }
    if (COLUMN_6.includes(num)) {
      console.log('it contains numbers from column 6')
      choose(COLUMN_6, num)
    }
    if (COLUMN_7.includes(num)) {
      console.log('it contains numbers from column 7')
      choose(COLUMN_7, num)
    }
  }
  const choose = (columnNum, circleNum) => {
    // console.log(columnNum)
    // console.log(circleNum)
    if (result.winner) return
    let columnsEmpty = []
    for (let i = 0; i < columnNum.length; i++) {
      board.map((val, idx) => {
        if (idx === columnNum[i] && val === '') {
          columnsEmpty.push(idx)
        }
      })
    }
    if (columnsEmpty === []) return
    board.map((val, idx) =>
      idx === columnsEmpty[0]
        ? setBoard(
            board.map((val, idx) => {
              if (idx === columnsEmpty[0] && val === '') {
                return color
              }

              return val
            })
          )
        : val
    )
    // console.log('empty circles in column', columnsEmpty)
  }
  const checkWin = () => {
    HORIZONTAL_WINS.forEach((currentPattern) => {
      // IF THERE ARE < 4 CONNECTED SLOTS, RETURN
      const variantOne_RowOne = board[currentPattern[0]]
      const variantTwo_RowOne = board[currentPattern[1]]
      const variantThree_RowOne = board[currentPattern[2]]
      const variantFour_RowOne = board[currentPattern[3]]
      if (
        variantOne_RowOne === '' ||
        variantTwo_RowOne === '' ||
        variantThree_RowOne === '' ||
        variantFour_RowOne === ''
      )
        return
      let foundWinningPattern = true
      currentPattern.forEach((idx) => {
        if (board[idx] !== color) {
          console.log(`checking slots... ${idx} matches player:${color}`)
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        let winner = ''
        if (color === 'red') winner = 'Player One'
        if (color === 'yellow') winner = 'Player Two'
        let gameResult = {
          winner: winner,
          state: 'nice cock!',
        }
        setResult(gameResult)
        if (winner === 'Player One') {
          setWinHistory({ ...winHistory, playerOne: winHistory.playerOne + 1 })
        }
        if (winner === 'Player Two') {
          setWinHistory({
            ...winHistory,
            playerTwo: winHistory.playerTwo + 1,
          })
        }
      }
      console.log('FOUR SLOTS HAVE BEEN PICKED, POTENTIAL WIN!')
    })
  }
  const restart = () => {
    setBoard(defaultBoard)
    setResult({})
  }
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      console.log(mousePosition.x)
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])
  const [toggleMarker, setToggleMarker] = useState(true)
  const turnOnMarker = (boolean) => {
    console.log('hovering', toggleMarker)
    setToggleMarker(boolean)
  }
  return (
    <>
      <Button variant="contained" color="playBtn" href="/">
        Go back to menu
      </Button>
      <Button variant="contained" color="success" onClick={restart}>
        Restart
      </Button>
      {result.winner ? (
        <h1>
          {`${result.winner}, 
          ${result.state}`}
        </h1>
      ) : null}
      <div className="board-container">
        <div className="player-card one">
          <img src="/images/player-one.svg" alt="player-one" />
          <div className="info">
            <h5>Player One</h5>
            <h1>{winHistory.playerOne}</h1>
          </div>
        </div>
        <div
          className="board"
          onMouseEnter={() => turnOnMarker(true)}
          onMouseLeave={() => turnOnMarker(false)}>
          <>
            <img
              src={`/images/marker-${color}.svg`}
              alt="player-two"
              className={`marker ${!toggleMarker ? 'disabled' : null}`}
              style={{
                transform: `translate(${mousePosition.x}px)`,
                // transition: 'opacity 2s ease',
                // opacity: `${toggleMarker ? 1 : 0}`,
              }}
            />
            {board.map((__, idx) => {
              return (
                <BoardOnClick
                  choose={!result.winner ? () => chooseColumn(idx) : null}
                  board={board[idx]}
                  val={idx}
                  color={!result.winner ? color : null}
                  key={idx}
                />
              )
            })}
          </>
        </div>
        <div className="player-card two">
          <img src="/images/player-two.svg" alt="player-two" />
          <h5>Player Two</h5>
          <h1>{winHistory.playerTwo}</h1>
        </div>
      </div>
    </>
  )
}

export default Board
