import React, { useState } from 'react'

const BoardOnClick = ({ choose, board, val, color }) => {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={choose}
      // onMouseEnter={onHoverEnter}
      // onMouseLeave={onHoverLeave}
      className={board ? `circle fill ${board}` : `circle`}>
      {board ? (
        <div className="">{val}</div>
      ) : (
        <div className={`semi-circle ${color}`}>{val}</div>
      )}
    </div>
  )
}

export default BoardOnClick
