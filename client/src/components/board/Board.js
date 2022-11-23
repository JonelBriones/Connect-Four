import React, { useState, useEffect, useRef, startTransition } from 'react'
import { Button } from '@mui/material'
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
  GAME_START_ROW,
} from './columns'
import {
  DIAGONAL_LEFT_WINS,
  DIAGONAL_RIGHT_WINS,
  HORIZONTAL_WINS,
  VERTICAL_WINS,
} from './winPatterns'
import { useParams } from 'react-router-dom'
console.log(window.location.href)

const Board = () => {
  const [board, setBoard] = useState(defaultBoard)
  const [result, setResult] = useState({})
  const [winHistory, setWinHistory] = useState({
    playerOne: 0,
    playerTwo: 0,
  })
  const { type } = useParams()
  const [computer, setComputer] = useState(false)
  const [local, setLocal] = useState(true)
  const [color, setColor] = useState('yellow')
  // const [color, setColor] = useState(computer ? 'red' : 'yellow')
  let time = 10
  const [remainingTime, setRemainingTime] = useState(time)
  const [startGame, setStartGame] = useState(false)
  useEffect(() => {
    checkWin()
    if (color === 'red' && !result.winner) {
      setColor('yellow')
    }
    if (color === 'yellow' && !result.winner) {
      setColor('red')
    }
  }, [board])

  useEffect(() => {
    if (startGame) {
      const startTimer = setInterval(() => {
        updateTime()
      }, 1000)
      return () => clearInterval(startTimer)
    }
  }, [color, startGame])
  useEffect(() => {
    if (computer && color === 'yellow') {
      console.log('computers turn')
      computerTurn()
      console.log('YELLOW PICKED A SLOT')
    }
  }, [computer && color === 'yellow'])
  const updateTime = () => {
    time--
    if (result.winner) {
      return
    }
    if (time <= -1) {
      time = 10
      setRemainingTime(time)
      console.log('time ran out')
      chooseRandom()
    }
    console.log('remaining time', time)
    setRemainingTime(time)
  }
  const randomSlot = () => {
    return Math.floor(Math.random() * 41)
  }
  const computerTurn = () => {
    chooseColumn(Math.floor(Math.random() * 41))
  }
  const chooseRandom = () => {
    let randomNumber = randomSlot()
    console.log(randomNumber)
    if (board[randomNumber] === '') {
      chooseColumn(randomNumber)
      checkWin()
    } else {
      return chooseRandom()
    }
  }
  const chooseColumn = (num) => {
    if (!startGame) return
    let gameStarted = false
    for (let i = 0; i < GAME_START_ROW.length; i++) {
      board.map((val, idx) => {
        if (idx === GAME_START_ROW[i] && val === 'red') {
          gameStarted = true
        }
      })
    }
    if (!gameStarted && color === 'yellow') {
      setColor('red')
      return
    }
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
                setRemainingTime(10)
                return color
              }

              return val
            })
          )
        : val
    )
  }

  const checkWin = () => {
    console.log('CHECKING VERTICAL WINS')
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
          // console.log(`checking slots... ${idx} matches player:${color}`)
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        let winner = ''
        if (color === 'red') winner = 'Player One'
        if (color === 'yellow') winner = 'Player Two'
        let gameResult = {
          winner: winner,
          state: 'has won!',
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
    console.log('CHECKING VERTICAL WINS')
    VERTICAL_WINS.forEach((currentPattern) => {
      // IF THERE ARE < 4 CONNECTED SLOTS, RETURN
      const variantOne_ColumnOne = board[currentPattern[0]]
      const variantTwo_ColumnOne = board[currentPattern[1]]
      const variantThree_ColumnOne = board[currentPattern[2]]
      if (
        variantOne_ColumnOne === '' ||
        variantTwo_ColumnOne === '' ||
        variantThree_ColumnOne === ''
      )
        return
      let foundWinningPattern = true
      currentPattern.forEach((idx) => {
        if (board[idx] !== color) {
          // console.log(`checking slots... ${idx} matches player:${color}`)
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        let winner = ''
        if (color === 'red') winner = 'Player One'
        if (color === 'yellow') winner = 'Player Two'
        let gameResult = {
          winner: winner,
          state: 'has won!',
        }
        setResult(gameResult)
        if (winner === 'Player One') {
          setWinHistory({
            ...winHistory,
            playerOne: winHistory.playerOne + 1,
          })
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
    console.log('CHECKING DIAGONAL RIGHT WINS')
    DIAGONAL_RIGHT_WINS.forEach((currentPattern) => {
      // IF THERE ARE < 4 CONNECTED SLOTS, RETURN
      // const variantOne_ColumnOne = board[currentPattern[0]]
      // const variantTwo_ColumnOne = board[currentPattern[1]]
      // const variantThree_ColumnOne = board[currentPattern[2]]
      // if (
      //   variantOne_ColumnOne === '' ||
      //   variantTwo_ColumnOne === '' ||
      //   variantThree_ColumnOne === ''
      // )
      //   return
      let foundWinningPattern = true
      currentPattern.forEach((idx) => {
        if (board[idx] !== color) {
          // console.log(`checking slots... ${idx} matches player:${color}`)
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        let winner = ''
        if (color === 'red') winner = 'Player One'
        if (color === 'yellow') winner = 'Player Two'
        let gameResult = {
          winner: winner,
          state: 'has won!',
        }
        setResult(gameResult)
        if (winner === 'Player One') {
          setWinHistory({
            ...winHistory,
            playerOne: winHistory.playerOne + 1,
          })
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
    console.log('CHECKING DIAGONAL LEFT WINS')
    DIAGONAL_LEFT_WINS.forEach((currentPattern) => {
      // IF THERE ARE < 4 CONNECTED SLOTS, RETURN
      // const variantOne_ColumnOne = board[currentPattern[0]]
      // const variantTwo_ColumnOne = board[currentPattern[1]]
      // const variantThree_ColumnOne = board[currentPattern[2]]
      // if (
      //   variantOne_ColumnOne === '' ||
      //   variantTwo_ColumnOne === '' ||
      //   variantThree_ColumnOne === ''
      // )
      //   return
      let foundWinningPattern = true
      currentPattern.forEach((idx) => {
        if (board[idx] !== color) {
          // console.log(`checking slots... ${idx} matches player:${color}`)
          foundWinningPattern = false
        }
      })
      if (foundWinningPattern) {
        let winner = ''
        if (color === 'red') winner = 'Player One'
        if (color === 'yellow') winner = 'Player Two'
        let gameResult = {
          winner: winner,
          state: 'has won!',
        }
        setResult(gameResult)
        if (winner === 'Player One') {
          setWinHistory({
            ...winHistory,
            playerOne: winHistory.playerOne + 1,
          })
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
    setColor('yellow')
    time = 10
    setRemainingTime(10)
  }
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])
  const [toggleMarker, setToggleMarker] = useState(false)
  const turnOnMarker = (boolean) => {
    setToggleMarker(boolean)
  }
  const switchMode = (mode) => {
    if (mode === 'computer') {
      setLocal(false)
      setComputer(true)
    }
    if (mode === 'local') {
      setLocal(true)
      setComputer(false)
    }
  }
  const onStart = () => {
    setColor('red')
    setStartGame(true)
  }
  const resetGame = () => {
    setColor('yellow')
    setBoard(defaultBoard)
    setResult({})

    time = 10
    setRemainingTime(10)
    setStartGame(false)
  }
  return (
    <>
      {/* <Button variant="contained" color="playBtn" href="/">
        Go back to menu
      </Button> */}
      <div className="nav-btns">
        {local ? (
          <Button
            variant="contained"
            color="playBtn"
            onClick={() => switchMode('computer')}
            disabled={startGame}>
            PLAY COMPUTER
          </Button>
        ) : (
          <Button
            variant="contained"
            color="playBtn"
            onClick={() => switchMode('local')}>
            PLAY LOCAL
          </Button>
        )}
        {!startGame && !result.winner ? (
          <Button variant="contained" color="success" onClick={onStart}>
            Start Game
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={resetGame}>
            Restart
          </Button>
        )}
      </div>
      {/* <Button variant="contained" color="warning" onClick={restart}>
        Restart
      </Button> */}
      {/* <Button variant="contained" color="warning" onClick={chooseRandom}>
        RANDOM
      </Button> */}
      <div className="board-state">
        {result.winner ? (
          <h1>
            {`${result.winner}, 
          ${result.state}`}
          </h1>
        ) : null}
      </div>
      <div className="board-container">
        <div className="player-card one">
          <img src="/images/player-one.svg" alt="player-one" />
          <div className="info">
            <h5>PLAYER 1</h5>
            <h1>{winHistory.playerOne}</h1>
          </div>
        </div>
        <img
          src={`/images/marker-${color}.svg`}
          alt="player-two"
          className={`marker ${
            !toggleMarker || result.winner ? 'disabled' : null
          }`}
          style={{
            transform: `translate(${mousePosition.x}px)`,
            // transition: 'opacity 2s ease',
            // opacity: `${toggleMarker ? 1 : 0}`,
          }}
        />
        <div
          className="board"
          onMouseEnter={() => turnOnMarker(true)}
          onMouseLeave={() => turnOnMarker(false)}>
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
          <div className="clock">
            <div className="triangle"></div>
            <div className="clock-info">
              <h5>PLAYER {color === 'red' ? '1' : '2'}'S TURN</h5>
              <h1>{remainingTime}s</h1>
            </div>
          </div>
        </div>
        <div className="player-card two">
          <img src="/images/player-two.svg" alt="player-two" />

          <h5>{computer ? 'COMPUTER' : 'PLAYER 2'}</h5>
          <h1>{winHistory.playerTwo}</h1>
        </div>
      </div>
    </>
  )
}

export default Board
