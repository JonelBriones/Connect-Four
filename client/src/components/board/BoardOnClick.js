import React, { useState } from 'react'

const BoardOnClick = ({ choose, board, val, color }) => {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={choose}
      className={board ? `circle fill ${board}` : `circle hover ${color}`}>
      {val}
    </div>
  )
}

export default BoardOnClick
