const input = require('fs')
  .readFileSync('./day_18/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

let results = []
const TIMES = '*'
const PLUS = '+'
const OPEN_PAREN = '('
const CLOSED_PAREN = ')'
const parenIsOpen = stack =>
  stack.filter(s => s === OPEN_PAREN).length >
  stack.filter(s => s === CLOSED_PAREN).length
const itemFound = v => v !== -1

const doMath = arr => {
  const nums = arr.map(a => parseInt(a)).filter(a => !isNaN(a))
  const operands = arr.filter(a => [PLUS, TIMES].includes(a))

  // find groups of plusses and process them, then put them back in their place.
  let parenGroup = [...arr]
  let i = operands.findIndex(o => o === PLUS)
  while (itemFound(i)) {
    const nextTimes = operands.findIndex((o, idx) => idx > i && o === TIMES)

    parenGroup[i * 2] = nums
      .slice(i, nextTimes === -1 ? operands.length + 1 : nextTimes + 1)
      .reduce((sum, n) => sum + n)

    const grEnd = itemFound(nextTimes) ? nextTimes * 2 + 1 : parenGroup.length
    for (let j = i * 2 + 1; j < grEnd; j++) parenGroup[j] = '$'

    i = operands.findIndex(
      (o, idx) => itemFound(nextTimes) && idx > nextTimes && o === PLUS
    )
  }

  return parenGroup.filter(a => !isNaN(a)).reduce((total, cur) => total * cur)
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

results.forEach(r => console.log(r))
console.log({ answer: results.reduce((sum, r) => sum + r) })
