const input = require('fs')
  .readFileSync('./day_17/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .map(i => i.split(''))

const TURNS = 6
const ACTIVE = '#'
const INACTIVE = '.'

const inactiveGridRow = length => Array.from({ length }, _ => '.')
const inactiveGrid = (numRows, rowLength) =>
  Array.from({ length: numRows }, a => inactiveGridRow(rowLength))

const oneUpGrid = grid => {
  const len = grid.length
  const newGrid = [[]]

  for (let rowI = 0; rowI < len + 2; rowI++) {
    if (rowI === 0 || rowI === len + 1) newGrid[rowI] = inactiveGridRow(len + 2)
    else {
      newGrid[rowI] = Array.from({ length: len + 2 }, (_, colI) =>
        colI === 0 || colI === len + 1 ? '.' : grid[rowI - 1][colI - 1]
      )
    }
  }
  return newGrid
}

// [z][y][x]
const startingGrid = Array.from({ length: 3 }, (_, i) =>
  i === 1 ? oneUpGrid(input) : inactiveGrid(input.length + 2, input.length + 2)
)

let xBoundaries = [input[0][0].length, 0]
let yBoundaries = [input[0].length, 0]
let zBoundaries = [input.length, 0]

const resizeGrid = grid => {
  let zUpper = zBoundaries[1]
  let yUpper = yBoundaries[1]
  let xUpper = xBoundaries[1]

  let newGrid = [...grid]
  if (zBoundaries[0] === 0) {
    newGrid = [
      inactiveGrid(newGrid[0].length, newGrid[0][0].length),
      ...newGrid
    ]
    zUpper++
  }
  if (zUpper === newGrid.length - 1) {
    newGrid = [
      ...newGrid,
      inactiveGrid(newGrid[0].length, newGrid[0][0].length)
    ]
  }

  if (yBoundaries[0] === 0) {
    newGrid = newGrid.map(z => [inactiveGridRow(z[0].length), ...z])
    yUpper++
  }
  if (yUpper === newGrid[0].length - 1) {
    newGrid = newGrid.map(z => [...z, inactiveGridRow(z[0].length)])
  }

  if (xBoundaries[0] === 0) {
    newGrid = newGrid.map(z => z.map(y => [INACTIVE, ...y]))
    xUpper++
  }

  if (xUpper === newGrid[0][0].length - 1) {
    newGrid = newGrid.map(z => z.map(y => [...y, INACTIVE]))
  }

  return newGrid
}

const neighbors = [
  [-1, -1, -1],
  [-1, -1, 0],
  [-1, -1, 1],
  [-1, 0, -1],
  [-1, 0, 0],
  [-1, 0, 1],
  [-1, 1, -1],
  [-1, 1, 0],
  [-1, 1, 1],
  [0, -1, -1],
  [0, -1, 0],
  [0, -1, 1],
  [0, 0, -1],
  [0, 0, 1],
  [0, 1, -1],
  [0, 1, 0],
  [0, 1, 1],
  [1, -1, -1],
  [1, -1, 0],
  [1, -1, 1],
  [1, 0, -1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, -1],
  [1, 1, 0],
  [1, 1, 1]
]

const getNewCubeState = (cubeState, xI, yI, zI) => {
  const xyLen = cubeState[0].length
  const zLen = cubeState.length

  const activeNeighborCount = neighbors.reduce((ct, cur) => {
    if (
      cur.some(
        (val, i) =>
          (i === 0 && (zI + val < 0 || zI + val >= zLen)) ||
          (i === 1 && (yI + val < 0 || yI + val >= xyLen)) ||
          (i === 2 && (xI + val < 0 || xI + val >= xyLen))
      )
    )
      return ct

    return (
      ct + (cubeState[zI + cur[0]][yI + cur[1]][xI + cur[2]] === ACTIVE ? 1 : 0)
    )
  }, 0)

  const getBoundaries = (i, b) => [i < b[0] ? i : b[0], i > b[1] ? i : b[1]]
  const activeResponse = () => {
    xBoundaries = getBoundaries(xI, xBoundaries)
    yBoundaries = getBoundaries(yI, yBoundaries)
    zBoundaries = getBoundaries(zI, zBoundaries)
    return ACTIVE
  }

  if (cubeState[zI][yI][xI] === ACTIVE) {
    return [2, 3].includes(activeNeighborCount) ? activeResponse() : INACTIVE
  }
  return activeNeighborCount === 3 ? activeResponse() : INACTIVE
}

const getNextGrid = curState =>
  resizeGrid(
    curState.map((z, iZ) =>
      z.map((y, iY) => y.map((x, iX) => getNewCubeState(curState, iX, iY, iZ)))
    )
  )

let grid = [...startingGrid]
for (let i = 0; i < TURNS; i++) {
  grid = getNextGrid(grid)
}

console.log(
  grid.reduce(
    (zSum, z) =>
      zSum +
      z.reduce(
        (ySum, y) =>
          ySum + y.reduce((xSum, x) => xSum + (x === ACTIVE ? 1 : 0), 0),
        0
      ),
    0
  )
)
