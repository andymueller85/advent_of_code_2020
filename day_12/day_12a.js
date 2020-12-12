const input = require('fs')
  .readFileSync('./day_12/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .map(d => d.match(/(^[a-z]+|[A-Z]+)([0-9]+$)/))
  .map(d => ({ act: d[1], val: parseInt(d[2], 10) }))

const N = 'N'
const S = 'S'
const E = 'E'
const W = 'W'
const F = 'F'
const L = 'L'
const R = 'R'

const isMoveAction = a => [N, S, E, W, F].includes(a)
const isXMove = a => [E, W].includes(a)
isPositiveMove = a => [N, E].includes(a)

let heading = E
let xPos = 0
let yPos = 0

const moveShip = (dir, val) => {
  if (isXMove(dir)) xPos += isPositiveMove(dir) ? val : -val
  else yPos += isPositiveMove(dir) ? val : -val
}

const directions = [N, E, S, W]

const turnShip = (dir, deg) => {
  const ticks = dir === R ? deg / 90 : (360 - deg) / 90

  const curHeadingIndex = directions.findIndex(a => a === heading)
  heading =
    directions[
      curHeadingIndex + ticks > directions.length - 1
        ? curHeadingIndex + ticks - directions.length
        : curHeadingIndex + ticks
    ]
}

input.forEach(i => {
  if (isMoveAction(i.act))
    if (i.act === F) moveShip(heading, i.val)
    else moveShip(i.act, i.val)
  else turnShip(i.act, i.val)
})

console.log({ xPos, yPos, answer: Math.abs(xPos) + Math.abs(yPos) })
