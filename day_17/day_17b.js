// This is a mess.  Need to come back to this with fresh eyes.
// build a solution that works for any number of dimensions.

const input = require('fs')
  .readFileSync('./day_17/input_dev.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .map(i => i.split(''))

const TURNS = 6
const ACTIVE = '#'
const INACTIVE = '.'

const inactiveGridRow = w => Array.from({ length: w }, _ => '.')
const inactiveGrid = (x, w) =>
  Array.from({ length: x }, () => inactiveGridRow(w))
const inactiveDaFuqIsThis = (y, x, w) =>
  Array.from({ length: y }, () => inactiveGrid(x, w))

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

const startingGridInNewDimension = Array.from({ length: 3 }, (_, i) =>
  i == 1
    ? startingGrid
    : inactiveDaFuqIsThis(3, input.length + 2, input.length + 2)
)

let wBoundaries = [startingGridInNewDimension[0][0][0].length, 0]
let xBoundaries = [startingGridInNewDimension[0][0].length, 0]
let yBoundaries = [startingGridInNewDimension[0].length, 0]
let zBoundaries = [startingGridInNewDimension.length, 0]

const resizeGrid = grid => {
  let zUpper = zBoundaries[1]
  let yUpper = yBoundaries[1]
  let xUpper = xBoundaries[1]
  let wUpper = wBoundaries[1]
  // const wLength = Math.max(grid[0][0].length, 3)
  // const xLength = Math.max(grid[0][0].length, 3)
  // const yLength = Math.max(grid[0][0].length, 3)
  // const zLength = grid.length
  let newGrid = [...grid]

  if (zBoundaries[0] >= 0) {
    newGrid = [
      inactiveDaFuqIsThis(
        newGrid[0].length,
        newGrid[0][0].length,
        newGrid[0][0][0].length
      ),
      ...newGrid
    ]
    zUpper++
  }
  if (zUpper === newGrid.length - 1) {
    newGrid = [
      ...newGrid,
      inactiveDaFuqIsThis(
        newGrid[0].length,
        newGrid[0][0].length,
        newGrid[0][0][0].length
      )
    ]
  }

  if (yBoundaries[0] >= 0) {
    newGrid = [
      inactiveGrid(newGrid[0][0].length, newGrid[0][0][0].length),
      ...newGrid
    ]
    yUpper++
  }
  if (yUpper === newGrid[0].length - 1) {
    newGrid = [
      ...newGrid,
      inactiveGrid(newGrid[0][0].length, newGrid[0][0][0].length)
    ]
  }

  if (xBoundaries[0] >= 0) {
    newGrid = newGrid.map(z => [inactiveGridRow(newGrid[0][0][0].length), ...z])
    xUpper++
  }
  if (xUpper === newGrid[0][0].length - 1) {
    newGrid = newGrid.map(z => [...z, inactiveGridRow(newGrid[0][0][0].length)])
  }

  if (wBoundaries[0] >= 0) {
    newGrid = newGrid.map(z => z.map(y => y.map(x => [INACTIVE, ...x])))
    wUpper++
  }
  if (wUpper === newGrid[0][0][0].length - 1) {
    newGrid = newGrid.map(z => z.map(y => y.map(x => [INACTIVE, ...x])))
  }

  return newGrid
}

// const getNeighbors = arr => {
//   const retArr = []

//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       for (let k = 0; k < 3; k++) {
//         for (let l = 0; l < 3; l++) {
//           if (!(arr[i] === 0 && arr[j] === 0 && arr[k] === 0 && arr[l] === 0))
//             retArr.push([arr[i], arr[j], arr[k], arr[l]])
//         }
//       }
//     }
//   }

//   return retArr
// }

// const neighbors = getNeighbors([-1, 0, 1])

// stealing. this is pretty slick.
function getNeighbors(dimensions) {
  let neighbors = [[-1], [0], [1]]

  for (let i = 1; i < dimensions; i++) {
    neighbors = [
      ...neighbors.map(x => [-1, ...x]),
      ...neighbors.map(x => [0, ...x]),
      ...neighbors.map(x => [1, ...x])
    ]
  }

  return neighbors.filter(x => !x.every(coord => coord == 0))
}

const neighbors = getNeighbors(4)

const getNewCubeState = (cubeState, wI, xI, yI, zI) => {
  const wLen = cubeState[0][0].length
  const xLen = cubeState[0][0].length
  const yLen = cubeState[0].length
  const zLen = cubeState.length

  const activeNeighborCount = neighbors.reduce((ct, cur) => {
    if (
      cur.some(
        (val, i) =>
          (i === 0 && (zI + val < 0 || zI + val >= zLen)) ||
          (i === 1 && (yI + val < 0 || yI + val >= yLen)) ||
          (i === 2 && (xI + val < 0 || xI + val >= xLen)) ||
          (i === 3 && (wI + val < 0 || wI + val >= wLen))
      )
    )
      return ct

    return (
      ct +
      (cubeState[zI + cur[0]][yI + cur[1]][xI + cur[2]][wI + cur[2]] === ACTIVE
        ? 1
        : 0)
    )
  }, 0)

  const getBoundaries = (i, b) => [i < b[0] ? i : b[0], i > b[1] ? i : b[1]]
  const activeResponse = () => {
    wBoundaries = getBoundaries(wI, wBoundaries)
    xBoundaries = getBoundaries(xI, xBoundaries)
    yBoundaries = getBoundaries(yI, yBoundaries)
    zBoundaries = getBoundaries(zI, zBoundaries)
    return ACTIVE
  }

  if (cubeState[zI][yI][xI][wI] === ACTIVE) {
    return [2, 3].includes(activeNeighborCount) ? activeResponse() : INACTIVE
  }
  return activeNeighborCount === 3 ? activeResponse() : INACTIVE
}

const getNextGrid = (curState, i) => {
  resizeGrid(
    curState.map((z, iZ) =>
      z.map((y, iY) =>
        y.map((x, iX) =>
          x.map((_, iW) => getNewCubeState(curState, iW, iX, iY, iZ))
        )
      )
    )
  )
}

let grid = [...startingGridInNewDimension]
for (let i = 0; i < TURNS; i++) {
  grid = getNextGrid(grid, i)

  console.log('turn', i + 1)
  console.log(
    grid.reduce(
      (zSum, z) =>
        zSum +
        z.reduce(
          (ySum, y) =>
            ySum +
            y.reduce(
              (xSum, x) =>
                xSum + x.reduce((wSum, w) => wSum + (w === ACTIVE ? 1 : 0), 0),
              0
            ),
          0
        ),
      0
    )
  )
}
