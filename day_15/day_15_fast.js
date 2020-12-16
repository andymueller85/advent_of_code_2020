// I was curious to see how others optimized since my solution took ~3.5 min
// Map is where it's at for this. under 4 seconds!
// credit: https://github.com/joaomlneto/advent-of-code/blob/master/2020/15/main.js

const numbers = [8, 11, 0, 19, 1, 2]
const { length } = numbers

const history = new Map(numbers.map((num, i) => [num, i]))

const t1 = Date.now()
let lastItem = numbers[numbers.length - 1]

for (let turn = length; turn < 30000000; turn++) {
  const newNumber = history.has(lastItem) ? turn - 1 - history.get(lastItem) : 0
  history.set(lastItem, turn - 1)
  lastItem = newNumber
}

console.log(lastItem)
console.log('time', Date.now() - t1)
