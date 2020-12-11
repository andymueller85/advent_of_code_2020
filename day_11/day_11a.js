const input = require('fs')
  .readFileSync('./day_11/input.txt', 'utf8')
  .split('\n')
  .filter(d => d)
  .map(i => i.split(''))

const isSeat = s => s !== '.'
const isEmpty = s => s === 'L'
const isOccupied = s => s === '#'
const colCt = input[0].length
const rowCt = input.length

const getAdjacentRowCount = (rowArr, col) =>
  rowArr
    .slice(col > 0 ? col - 1 : 0, col < colCt - 1 ? col + 2 : colCt)
    .filter(s => isOccupied(s)).length

const getAdjacentSeatCount = (seatArr, row, col) => {
  const aboveCt = row > 0 ? getAdjacentRowCount(seatArr[row - 1], col) : 0
  const leftCt = col > 0 && isOccupied(seatArr[row][col - 1]) ? 1 : 0
  const rightCt = col < colCt - 1 && isOccupied(seatArr[row][col + 1]) ? 1 : 0
  const belowCt =
    row < rowCt - 1 ? getAdjacentRowCount(seatArr[row + 1], col) : 0

  return aboveCt + leftCt + rightCt + belowCt
}

const processSeat = (seatArr, row, col) => {
  const adjacentSeatCount = getAdjacentSeatCount(seatArr, row, col)

  if (isEmpty(seatArr[row][col]) && adjacentSeatCount === 0) return '#'
  else if (isOccupied(seatArr[row][col]) && adjacentSeatCount >= 4) return 'L'
  else return seatArr[row][col]
}

const processArrivals = curSeatArr =>
  curSeatArr.map((row, x, a) =>
    row.map((seat, y) => (isSeat(seat) ? processSeat(a, x, y) : seat))
  )

let prevState = input
let newState = []

while (JSON.stringify(prevState) !== JSON.stringify(newState)) {
  prevState = newState.length > 0 ? [...newState] : prevState
  newState = processArrivals(prevState)
}

const countOccupiedSeats = arr =>
  arr.reduce(
    (sum, row) =>
      sum +
      row.reduce((rowSum, seat) => rowSum + (isOccupied(seat) ? 1 : 0), 0),
    0
  )

console.log(countOccupiedSeats(newState))
