// slow - never finished for 3,000,000
const numbers = [0, 3, 6]
const lastItem = a => a[a.length - 1]

const t1 = Date.now()

for (let turn = numbers.length; turn < 30000000; turn++) {
  numbers.push(
    numbers.filter(n => n === lastItem(numbers)).length > 1
      ? turn - 1 - numbers.lastIndexOf(lastItem(numbers), numbers.length - 2)
      : 0
  )
  if (turn % 1000000 === 0) {
    console.log({ turn })
  }
}
console.log(lastItem(numbers))
console.log('time', Date.now() - t1)
