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

const getVisibleOccupiedSeatCount = (seatArr, row, col) => {
  let ct = 0

  // north
  ct += check(row, (_, i) => seatArr[row - 1 - i][col])

  // northeast
  ct += check(
    Math.min(row, colCt - col - 1),
    (_, i) => seatArr[row - 1 - i][i + col + 1]
  )

  // east
  ct += isOccupied(seatArr[row].slice(col + 1).find(seat => isSeat(seat)))
    ? 1
    : 0

  // southeast
  ct += check(
    Math.min(rowCt - row, colCt - col) - 1,
    (_, i) => seatArr[i + row + 1][i + col + 1]
  )

  // south
  ct += check(rowCt - row - 1, (_, i) => seatArr[i + row + 1][col])

  // southwest
  ct += check(
    Math.min(rowCt - row - 1, col),
    (_, i) => seatArr[i + row + 1][col - 1 - i]
  )

  // west
  ct += check(col, (_, i) => seatArr[row][col - 1 - i])

  // northwest
  ct += check(Math.min(row, col), (_, i) => seatArr[row - 1 - i][col - 1 - i])

  return ct
}

const processSeat = (seatArr, row, col) => {
  const ct = getVisibleOccupiedSeatCount(seatArr, row, col)

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
