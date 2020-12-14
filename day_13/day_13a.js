const [departure, schedule] = require('fs')
  .readFileSync('./day_13/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

const { bus, nextDeparture } = schedule
  .split(',')
  .filter(b => b !== 'x')
  .map(b => parseInt(b, 10))
  .map(b => ({
    bus: b,
    nextDeparture: b - (parseInt(departure, 10) % b)
  }))
  .reduce((min, b) => (b.nextDeparture < min.nextDeparture ? b : min))

console.log({
  bus,
  nextDeparture,
  answer: bus * nextDeparture
})
