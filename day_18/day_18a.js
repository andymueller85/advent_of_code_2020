const input = require('fs')
  .readFileSync('./day_18/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

let results = []
const TIMES = '*'
const PLUS = '+'
const OPEN_PAREN = '('
const CLOSED_PAREN = ')'
const isOperand = v => [TIMES, PLUS].includes(v)
const parenIsOpen = stack =>
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

const processGroup = (result, stack) => {
  const groupResult = doMath(
    stack.splice(stack.lastIndexOf(OPEN_PAREN)).filter(h => h !== OPEN_PAREN)
  )
  if (parenIsOpen(stack)) {
    stack.push(groupResult)
  } else {
    result.push(groupResult)
  }
}

input.forEach(equation => {
  let equationResult = []
  let stack = []

  const eqArr = [...equation].filter(c => c !== ' ')

  eqArr.forEach((c, i, a) => {
    if (stack.length === 0) {
      if (c === OPEN_PAREN) {
        stack.push(c)
      } else {
        equationResult.push(c)
      }
    } else if (c === CLOSED_PAREN) {
      processGroup(equationResult, stack)
    } else {
      stack.push(c)
    }
  })

  results.push(doMath(equationResult))
  equationResult.splice(0, equationResult.length)
})

const answer = results.reduce((sum, r) => sum + r)
console.log({ answer })
