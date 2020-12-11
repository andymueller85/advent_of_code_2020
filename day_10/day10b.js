const input = require('fs')
  .readFileSync('./day_10/input.txt', 'utf8')
  .split('\n')
  .filter(d => d)
  .map(d => parseInt(d, 10))
  .sort((a, b) => a - b)

input.push(Math.max(...input) + 3)
const diffs = input.map((jolts, idx, a) =>
  idx === 0 ? jolts : jolts - a[idx - 1]
)

let i = 0
let result = 1

while (i < diffs.length) {
  if (diffs[i] === 1) {
    const nextNonOneIndexOffset = diffs.slice(i).findIndex(x => x !== 1)
    const { length } = diffs.slice(i, i + nextNonOneIndexOffset)
    result *= 2 ** (length - 1) - (length < 3 ? 0 : length - 3)
    i += nextNonOneIndexOffset
  } else {
    i++
  }
}

console.log({ result })
