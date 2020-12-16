// a little faster - around 3.5 min for 30,000,000
const numbers = [8, 11, 0, 19, 1, 2]
const { length } = numbers

const history = Array(30000000)
numbers.forEach((n, i) => (history[n] = i))

const t1 = Date.now()
let lastItem = numbers[numbers.length - 1]

for (let turn = length; turn < 30000000; turn++) {
  const newNumber =
    history[lastItem] !== undefined ? turn - 1 - history[lastItem] : 0
  history[lastItem] = turn - 1
  lastItem = newNumber
}

console.log(lastItem)
console.log('time', Date.now() - t1)
