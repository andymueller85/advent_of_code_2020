const input = require('fs')
  .readFileSync('./day_13/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)[1]
  .split(',')
  .map(t => parseInt(t, 10) || t)

const isBus = b => Number.isInteger(b)
const getTimestamp = (buses, minute, increment) => {
  while (!buses.every((b, idx) => !isBus(b) || (minute + idx) % b === 0))
    minute += increment

  return input.length === buses.length
    ? minute
    : getTimestamp(
        buses.concat(
          ...input.slice(
            buses.length,
            input.findIndex((b, idx) => idx >= buses.length && isBus(b)) + 1
          )
        ),
        minute,
        buses.reduce((acc, b) => acc * (isBus(b) ? b : 1))
      )
}

const nextBus = input.findIndex((b, i) => i > 0 && isBus(b)) + 1
console.log('answer:', getTimestamp(input.slice(0, nextBus), 0, 1))
