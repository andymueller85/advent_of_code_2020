const buses = require('fs')
  .readFileSync('./day_13/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)[1]
  .split(',')
  .map(t => parseInt(t, 10) || t)

const getTimestamp = (minute, index, increment) => {
  const slice = buses.slice(
    0,
    buses.findIndex((b, i) => i > index && Number.isInteger(b)) + 1
  )

  while (!slice.every((b, i) => !Number.isInteger(b) || (minute + i) % b === 0))
    minute += increment

  return slice.length >= buses.length
    ? minute
    : getTimestamp(
        minute,
        slice.length - 1,
        slice.reduce((acc, b) => acc * (Number.isInteger(b) ? b : 1)),
      )
}

console.log('answer:', getTimestamp(0, 0, 1)) // 906332393333683
