const input = require('fs')
  .readFileSync('./day_11/input.txt', 'utf8')
  .split('\r\n')
  .filter(d => d)
  .map(i => i.split(''))

const FLOOR = '.'
const OCCUPIED_SEAT = '#'
const EMPTY_SEAT = 'L'

const isSeat = s => s !== FLOOR
const isEmpty = s => s === EMPTY_SEAT
const isOccupied = s => s === OCCUPIED_SEAT
const colCt = input[0].length
const rowCt = input.length

const getVisibleOccupiedSeatCount = (seatArr, row, col) => {
  let n = 0,
    ne = 0,
    e = 0,
    se = 0,
    s = 0,
    sw = 0,
    w = 0,
    nw = 0

  if (row > 0) {
    const nRow =
      Array.from({ length: row }, (_, i) => row - 1 - i).find(rowI =>
        isSeat(seatArr[rowI][col])
      ) ?? -1

    n = nRow > -1 && isOccupied(seatArr[nRow][col]) ? 1 : 0
  }

  if (row > 0 && col < colCt - 1) {
    const [neRow, neCol] = Array.from(
      { length: Math.min(row, colCt - col - 1) },
      (_, i) => [row - 1 - i, i + col + 1]
    ).find(([rowI, colI]) => isSeat(seatArr[rowI][colI])) ?? [-1, -1]

    ne = neRow > -1 && neCol > -1 && isOccupied(seatArr[neRow][neCol]) ? 1 : 0
  }

  e =
    col < colCt - 1 &&
    isOccupied(seatArr[row].slice(col + 1).find(seat => isSeat(seat)))
      ? 1
      : 0

  if (col < colCt - 1 && row < rowCt - 1) {
    const [seRow, seCol] = Array.from(
      { length: Math.min(rowCt - row, colCt - col) - 1 },
      (_, i) => [i + row + 1, i + col + 1]
    ).find(([rowI, colI]) => isSeat(seatArr[rowI][colI])) ?? [-1, -1]

    se = seRow > -1 && seCol > -1 && isOccupied(seatArr[seRow][seCol]) ? 1 : 0
  }

  if (row < rowCt - 1) {
    const sRow = Array.from(
      { length: rowCt - row - 1 },
      (_, i) => i + row + 1
    ).find(rowI => isSeat(seatArr[rowI][col]))

    s = sRow > -1 && isOccupied(seatArr[sRow][col]) ? 1 : 0
  }

  if (row < rowCt - 1 && col > 0) {
    const [swRow, swCol] = Array.from(
      { length: Math.min(rowCt - row - 1, col) },
      (_, i) => [i + row + 1, col - 1 - i]
    ).find(([rowI, colI]) => isSeat(seatArr[rowI][colI])) ?? [-1, -1]

    sw = swRow > -1 && swCol > -1 && isOccupied(seatArr[swRow][swCol]) ? 1 : 0
  }

  if (col > 0) {
    const wCol = Array.from({ length: col }, (_, i) => col - 1 - i).find(colI =>
      isSeat(seatArr[row][colI])
    )

    w = wCol > -1 && isOccupied(seatArr[row][wCol]) ? 1 : 0
  }

  if (row > 0 && col > 0) {
    const [nwRow, nwCol] = Array.from(
      { length: Math.min(row, col) },
      (_, i) => [row - 1 - i, col - 1 - i]
    ).find(([rowI, colI]) => isSeat(seatArr[rowI][colI])) ?? [-1, -1]

    nw = nwRow > -1 && nwCol > -1 && isOccupied(seatArr[nwRow][nwCol]) ? 1 : 0
  }

  return e + s + w + n + se + sw + nw + ne
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
