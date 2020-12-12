const input = require('fs')
  .readFileSync('./day_11/input_dev.txt', 'utf8')
  .split('\n')
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

const getAdjSeatCount = (seatArr, row, col) => {
  const aboveCt = row > 0 ? getAdjRowCount(seatArr[row - 1], col) : 0
  const leftCt = col > 0 && isOccupied(seatArr[row][col - 1]) ? 1 : 0
  const rightCt = col < colCt - 1 && isOccupied(seatArr[row][col + 1]) ? 1 : 0
  const belowCt = row < rowCt - 1 ? getAdjRowCount(seatArr[row + 1], col) : 0

  return aboveCt + leftCt + rightCt + belowCt
}

const getVisibleSeatCount = (seatArr, row, col) => {
  const e =
    col < colCt - 1 && seatArr[row].slice(col).some(seat => isOccupied(seat))
      ? 1
      : 0

  const s =
    row < rowCt - 1 &&
    Array.from({ length: rowCt - row - 1 }, (_, i) => i + row + 1)
      .map(i => seatArr[i][col])
      .some(seat => isOccupied(seat))
      ? 1
      : 0

  const w = col > 0 && seatArr[row].slice(0, col - 1)

  return e + s
}

const processSeat = (seatArr, row, col) => {
  const visibleSeatCount = getVisibleSeatCount(seatArr, row, col)

  if (isEmpty(seatArr[row][col]) && visibleSeatCount === 0) return OCCUPIED_SEAT
  else if (isOccupied(seatArr[row][col]) && visibleSeatCount >= 5)
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
