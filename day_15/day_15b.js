const numbers = [8, 11, 0, 19, 1, 2]
const { length } = numbers
const history = numbers
  .slice(0, numbers.length - 1)
  .reduce((acc, cur, i) => ({ ...acc, [cur]: i }), {})

const t1 = Date.now()
let lastItem = numbers[numbers.length - 1]

for (let turn = length; turn < 2020; turn++) {
  const newNumber = history[lastItem] >= 0 ? turn - 1 - history[lastItem] : 0
  history[lastItem] = turn - 1
  lastItem = newNumber

  if (turn % 1000000 === 0) {
    console.log({ turn })
  }
}

console.log(lastItem)
console.log('time', Date.now() - t1)
