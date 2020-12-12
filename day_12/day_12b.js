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
const isPositiveMove = a => [N, E].includes(a)

let shipXPos = 0
let shipYPos = 0
let waypointXPos = 10
let waypointYPos = 1

const moveShip = val => {
  shipXPos += val * waypointXPos
  shipYPos += val * waypointYPos
}

const moveWaypoint = (dir, val) => {
  if (isXMove(dir)) waypointXPos += isPositiveMove(dir) ? val : -val
  else waypointYPos += isPositiveMove(dir) ? val : -val
}

const rotateWaypoint = (dir, deg) => {
  const relativeRotation = dir === R ? deg : 360 - deg
  const curWaypointXPos = waypointXPos
  const curWaypointYPos = waypointYPos

  if (relativeRotation === 90) {
    waypointXPos = curWaypointYPos
    waypointYPos = curWaypointXPos * -1
  }
  if (relativeRotation === 180) {
    waypointXPos = curWaypointXPos * -1
    waypointYPos = curWaypointYPos * -1
  }
  if (relativeRotation === 270) {
    waypointXPos = curWaypointYPos * -1
    waypointYPos = curWaypointXPos
  }
}

input.forEach(i => {
  if (isMoveAction(i.act))
    if (i.act === F) moveShip(i.val)
    else moveWaypoint(i.act, i.val)
  else rotateWaypoint(i.act, i.val)
})

console.log({
  xPos: shipXPos,
  yPos: shipYPos,
  answer: Math.abs(shipXPos) + Math.abs(shipYPos)
})
