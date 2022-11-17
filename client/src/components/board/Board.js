import { resolveBreakpointValues } from '@mui/system/breakpoints'
import React, { useState } from 'react'
import BoardOnClick from './BoardOnClick'
import { defaultBoard } from './defaultBoard'
import {
  COLUMN_1,
  COLUMN_2,
  COLUMN_3,
  COLUMN_4,
  COLUMN_5,
  COLUMN_6,
  COLUMN_7,
} from './rows'
const Board = () => {
  const [board, setBoard] = useState(defaultBoard)
  const [color, setColor] = useState('red')
  console.log(board)
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
    console.log(columnNum)
    console.log(circleNum)
    let columnsEmpty = []
    for (let i = 0; i < columnNum.length; i++) {
      board.map((val, idx) => {
        if (idx === columnNum[i] && val === '') {
          console.log(columnNum[i])
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
                if (color === 'red') {
                  setColor('yellow')
                }
                if (color === 'yellow') {
                  setColor('red')
                }
                return color
              }

              return val
            })
          )
        : val
    )
    // console.log('empty circles in column', columnsEmpty)
  }
  return (
    <>
      <div className="board">
        {board.map((__, idx) => {
          return (
            <BoardOnClick
              choose={() => chooseColumn(idx)}
              board={board[idx]}
              val={idx}
              color={color}
              key={idx}
            />
          )
        })}
      </div>
      {/* <div className="board">
        <BoardOnClick choose={() => choose(0)} color={board[0]} val={0} />
        <BoardOnClick
          choose={() => choose(1, 'COLUMN_1')}
          color={board[1]}
          val={1}
        />
        <BoardOnClick
          choose={() => choose(2, 'COLUMN_1')}
          color={board[2]}
          val={2}
        />
        <BoardOnClick
          choose={() => choose(3, 'COLUMN_1')}
          color={board[3]}
          val={3}
        />
        <BoardOnClick choose={() => choose(4)} color={board[4]} val={4} />
        <BoardOnClick choose={() => choose(5)} color={board[5]} val={5} />
        <BoardOnClick choose={() => choose(6)} color={board[6]} val={6} />

        <BoardOnClick choose={() => choose(7)} color={board[7]} val={7} />
        <BoardOnClick choose={() => choose(8)} color={board[8]} val={8} />
        <BoardOnClick choose={() => choose(9)} color={board[9]} val={9} />
        <BoardOnClick choose={() => choose(10)} color={board[10]} val={10} />
        <BoardOnClick choose={() => choose(11)} color={board[11]} val={11} />
        <BoardOnClick choose={() => choose(12)} color={board[12]} val={12} />
        <BoardOnClick choose={() => choose(13)} color={board[13]} val={13} />

        <BoardOnClick choose={() => choose(14)} color={board[14]} val={14} />
        <BoardOnClick choose={() => choose(15)} color={board[15]} val={15} />
        <BoardOnClick choose={() => choose(16)} color={board[16]} val={16} />
        <BoardOnClick choose={() => choose(17)} color={board[17]} val={17} />
        <BoardOnClick choose={() => choose(18)} color={board[18]} val={18} />
        <BoardOnClick choose={() => choose(19)} color={board[19]} val={19} />
        <BoardOnClick choose={() => choose(20)} color={board[20]} val={20} />

        <BoardOnClick choose={() => choose(21)} color={board[21]} val={21} />
        <BoardOnClick choose={() => choose(22)} color={board[22]} val={22} />
        <BoardOnClick choose={() => choose(23)} color={board[23]} val={23} />
        <BoardOnClick choose={() => choose(24)} color={board[24]} val={24} />
        <BoardOnClick choose={() => choose(25)} color={board[25]} val={25} />
        <BoardOnClick choose={() => choose(26)} color={board[26]} val={26} />
        <BoardOnClick choose={() => choose(27)} color={board[27]} val={27} />

        <BoardOnClick choose={() => choose(28)} color={board[28]} val={28} />
        <BoardOnClick choose={() => choose(29)} color={board[29]} val={29} />
        <BoardOnClick choose={() => choose(30)} color={board[30]} val={30} />
        <BoardOnClick choose={() => choose(31)} color={board[31]} val={31} />
        <BoardOnClick choose={() => choose(32)} color={board[32]} val={32} />
        <BoardOnClick choose={() => choose(33)} color={board[33]} val={33} />
        <BoardOnClick choose={() => choose(34)} color={board[34]} val={34} />

        <BoardOnClick choose={() => choose(35)} color={board[35]} val={35} />
        <BoardOnClick choose={() => choose(36)} color={board[36]} val={36} />
        <BoardOnClick choose={() => choose(37)} color={board[37]} val={37} />
        <BoardOnClick choose={() => choose(38)} color={board[38]} val={38} />
        <BoardOnClick choose={() => choose(39)} color={board[39]} val={39} />
        <BoardOnClick choose={() => choose(40)} color={board[40]} val={40} />
        <BoardOnClick choose={() => choose(41)} color={board[41]} val={41} />
      </div> */}
    </>
  )
}

export default Board
