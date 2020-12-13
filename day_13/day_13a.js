const input = require('fs')
  .readFileSync('./day_13/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

const departure = parseInt(input[0], 10)
const { bus, nextDeparture } = input[1]
  .split(',')
  .filter(t => t !== 'x')
  .map(t => parseInt(t, 10))
  .map(t => ({
    bus: t,
    nextDeparture: t - (departure % t)
  }))
  .reduce((min, { bus, nextDeparture }) =>
    nextDeparture < min.nextDeparture ? { bus, nextDeparture } : min
  )

console.log({
  bus,
  nextDeparture,
  answer: bus * nextDeparture
})
