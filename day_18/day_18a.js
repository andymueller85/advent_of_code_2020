const input = require('fs')
  .readFileSync('./day_18/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

console.log({ input })

let stack = []
let holdValues = []
let results = []
let result = []
const TIMES = '*'
const PLUS = '+'
const OPEN_PAREN = '('
const CLOSED_PAREN = ')'
const isOperand = v => [TIMES, PLUS].includes(v)
const stackIsEmpty = () => stack.length === 0
const parenIsOpen = () =>
  stack.filter(s => s === OPEN_PAREN).length >
  stack.filter(s => s === CLOSED_PAREN).length

const doMath = arr => {
  const nums = arr.map(a => parseInt(a)).filter(a => !isNaN(a))
  const operands = arr.filter(a => [PLUS, TIMES].includes(a))

  let result = nums.shift()
  let num = nums.shift()

  operands.forEach(o => {
    if (o === PLUS) result += num
    if (o === TIMES) result *= num

    num = nums.shift()
  })

  return result
}

const processGroup = endOfInput => {
  // can probably just slice instead of this holder nonsense
  let holder = []
  let popped = ''
  while (popped !== OPEN_PAREN) {
    popped = stack.pop()
    holder.push(popped)
  }

  const groupResult = doMath(holder.filter(h => h !== OPEN_PAREN).reverse())
  if (parenIsOpen()) {
    stack.push(groupResult)
  } else {
    // add to result
    result.push(groupResult)
  }

  holder.splice(0, holder.length)
}

input.forEach((equation, idx) => {
  const eqArr = [...equation].filter(c => c !== ' ')

  eqArr.forEach((c, i, a) => {
    if (stackIsEmpty()) {
      if (c === OPEN_PAREN) stack.push(c)
      else result.push(c)
    } else if (parenIsOpen()) {
      if (c === CLOSED_PAREN) {
        processGroup(
          i === a.length - 1 || a.slice(i).every(a => a === CLOSED_PAREN)
        )
      } else {
        if (isOperand(c) && stack[stack.length - 1] === OPEN_PAREN) {
          result.push(c)
        } else {
          stack.push(c)
        }
      }
    } else {
      result.push(c)
    }
  })

  if (stack.length > 0) {
    processGroup()
  }

  result = result.concat(doMath(holdValues))
  results.push(doMath(result))

  // reset things
  result.splice(0, result.length)
})

const answer = results.reduce((sum, r) => sum + r)
console.log({ answer })
