import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const current = history[stepNumber]

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1)
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) { return }

    xIsNext ? squares[i] = 'X' : squares[i] = 'O'
    setHistory(historyCopy.concat([{ squares: squares }]))
    setStepNumber(historyCopy.length)
    setXIsNext(!xIsNext)
  }

  const jumpToStep = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const winner = calculateWinner(current.squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`
  }
  const moves = history.map((_step, move) => {
    const text = move > 0 ? `Go to move #: ${move}` : 'Back to gamestart'
    return(
      <li key={move}>
        <button onClick={() => jumpToStep(move)}>{text}</button>
      </li>
    )
  })

  return (
    <div className='game'>
        <div className='game-board'>
          <Board squares={current.squares} onClick={(i) => { handleClick(i) }} />
        </div>
        <div className='game-info'>
          <div className='status'>{ status }</div>
          <div>{moves}</div>
        </div>
      </div>
  )
}

function Board(props) {
  const renderSquare = (i) => (
    <Square value={props.squares[i]}
            onClick={() => { props.onClick(i) } } />
  )

  return (
    <div>
      <div className='board-row'>
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div className='board-row'>
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div className='board-row'>
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  )
}

function Square(props) {
  return(
    <button className='square' onClick={ props.onClick }>
      { props.value }
    </button>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
