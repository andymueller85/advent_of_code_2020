const input = require('fs')
  .readFileSync('./day_11/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .map(i => i.split(''))

const OCCUPIED_SEAT = '#'
const EMPTY_SEAT = 'L'

const isEmpty = s => s === EMPTY_SEAT
const isOccupied = s => s === OCCUPIED_SEAT
const colCt = input[0].length
const rowCt = input.length

const getAdjRowCount = (rowArr, col) =>
  rowArr
    .slice(col > 0 ? col - 1 : 0, col < colCt - 1 ? col + 2 : colCt)
    .filter(s => isOccupied(s)).length

const getAdjSeatCount = (seatArr, row, col) => 
   (row > 0 ? getAdjRowCount(seatArr[row - 1], col) : 0) + // above
   (col > 0 && isOccupied(seatArr[row][col - 1]) ? 1 : 0) + // left
   (col < colCt - 1 && isOccupied(seatArr[row][col + 1]) ? 1 : 0) + // right
   (row < rowCt - 1 ? getAdjRowCount(seatArr[row + 1], col) : 0) // below

const processSeat = (seatArr, row, col) => {
  const adjacentSeatCount = getAdjSeatCount(seatArr, row, col)

  if (isEmpty(seatArr[row][col]) && adjacentSeatCount === 0)
    return OCCUPIED_SEAT
  else if (isOccupied(seatArr[row][col]) && adjacentSeatCount >= 4)
    return EMPTY_SEAT
  else return seatArr[row][col]
}

const processArrivals = curSeatArr =>
  curSeatArr.map((row, rowIdx, a) =>
    row.map((_, colIdx) => processSeat(a, rowIdx, colIdx))
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
      row.reduce((rowSum, spot) => rowSum + (isOccupied(spot) ? 1 : 0), 0),
    0
  )

console.log(countOccupiedSeats(newState))
