const input = require('fs')
  .readFileSync('./day_11/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .map(i => i.split(''))

const FLOOR = '.'
const OCCUPIED_SEAT = '#'
const EMPTY_SEAT = 'L'
const isSeat = s => s && s !== FLOOR
const isEmpty = s => s && s === EMPTY_SEAT
const isOccupied = s => s && s === OCCUPIED_SEAT
const colCt = input[0].length
const rowCt = input.length

const check = (length, mapFn) =>
  length > 0 &&
  isOccupied(Array.from({ length }, mapFn).find(seat => isSeat(seat)))
    ? 1
    : 0

const getOccupiedSeatCount = (seatArr, row, col) =>
  check(row, (_, i) => seatArr[row - 1 - i][col]) + // north
  check(
    Math.min(row, colCt - col - 1),
    (_, i) => seatArr[row - 1 - i][i + col + 1]
  ) + // northeast
  check(colCt - col - 1, (_, i) => seatArr[row][i + col + 1]) + // east
  check(
    Math.min(rowCt - row, colCt - col) - 1,
    (_, i) => seatArr[i + row + 1][i + col + 1]
  ) + // southeast
  check(rowCt - row - 1, (_, i) => seatArr[i + row + 1][col]) + // south
  check(
    Math.min(rowCt - row - 1, col),
    (_, i) => seatArr[i + row + 1][col - 1 - i]
  ) + // southwest
  check(col, (_, i) => seatArr[row][col - 1 - i]) + // west
  check(Math.min(row, col), (_, i) => seatArr[row - 1 - i][col - 1 - i]) // northwest

const processSeat = (seatArr, row, col) => {
  const ct = getOccupiedSeatCount(seatArr, row, col)

  if (isEmpty(seatArr[row][col]) && ct === 0) return OCCUPIED_SEAT
  else if (isOccupied(seatArr[row][col]) && ct >= 5) return EMPTY_SEAT
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
