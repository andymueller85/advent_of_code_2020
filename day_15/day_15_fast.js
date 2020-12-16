// I was curious to see how others optimized since my solution took ~3.5 min
// Map finishes in under 4 seconds - pre-allocated array in under 1 sec!
// credit: https://github.com/joaomlneto/advent-of-code/blob/master/2020/15/main.js

const mapSolution = (seedNumbers, numTurns) => {
  const { length } = seedNumbers

  const history = new Map(seedNumbers.map((num, i) => [num, i]))

  let lastItem = seedNumbers[seedNumbers.length - 1]

  for (let turn = length; turn < numTurns; turn++) {
    const newNumber = history.has(lastItem)
      ? turn - 1 - history.get(lastItem)
      : 0
    history.set(lastItem, turn - 1)
    lastItem = newNumber
  }

  return lastItem
}

const preAllocatedArraySolution = (seedNumbers, numTurns) => {
  const { length } = seedNumbers

  const history = Array(numTurns)
  seedNumbers.forEach((n, i) => (history[n] = i))

  let lastItem = seedNumbers[seedNumbers.length - 1]

  for (let turn = length; turn < numTurns; turn++) {
    const newNumber =
      history[lastItem] !== undefined ? turn - 1 - history[lastItem] : 0
    history[lastItem] = turn - 1
    lastItem = newNumber
  }

  return lastItem
}

const seedNumbers = [8, 11, 0, 19, 1, 2]
const turns = 30000000

const t1 = Date.now()
console.log('answer:', mapSolution(seedNumbers, turns))
console.log('time:', Date.now() - t1)

const t2 = Date.now()
console.log('answer:', preAllocatedArraySolution(seedNumbers, turns))
console.log('time:', Date.now() - t2)
