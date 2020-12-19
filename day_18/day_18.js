const MULTIPLY = '*'
const ADD = '+'
const OPEN_PAREN = '('
const CLOSED_PAREN = ')'
const parenIsOpen = stack =>
  stack.filter(s => s === OPEN_PAREN).length >
  stack.filter(s => s === CLOSED_PAREN).length
const itemFound = v => v !== -1
const getNums = arr => arr.map(a => parseInt(a)).filter(a => !isNaN(a))
const getOperands = arr => arr.filter(a => [ADD, MULTIPLY].includes(a))

const part1Math = arr => {
  const nums = getNums(arr)
  const operands = getOperands(arr)

  let result = nums.shift()
  let num = nums.shift()

  operands.forEach(o => {
    if (o === ADD) result += num
    if (o === MULTIPLY) result *= num
    num = nums.shift()
  })

  return result
}

const part2Math = arr => {
  const nums = getNums(arr)
  const operands = getOperands(arr)

  // find groups of plusses and process them, then put them back in their place.
  let parenGroup = [...arr]
  let i = operands.findIndex(o => o === ADD)
  while (itemFound(i)) {
    const nextMultiply = operands.findIndex(
      (o, idx) => idx > i && o === MULTIPLY
    )

    parenGroup[i * 2] = nums
      .slice(i, nextMultiply === -1 ? operands.length + 1 : nextMultiply + 1)
      .reduce((sum, n) => sum + n)

    const grEnd = itemFound(nextMultiply)
      ? nextMultiply * 2 + 1
      : parenGroup.length
    for (let j = i * 2 + 1; j < grEnd; j++) parenGroup[j] = '$' // just a placeholder value, no significance

    i = operands.findIndex(
      (o, idx) => itemFound(nextMultiply) && idx > nextMultiply && o === ADD
    )
  }

  return parenGroup.filter(a => !isNaN(a)).reduce((total, cur) => total * cur)
}

const processGroup = (result, stack, mathFn) => {
  const groupResult = mathFn(
    stack.splice(stack.lastIndexOf(OPEN_PAREN)).filter(h => h !== OPEN_PAREN)
  )
  if (parenIsOpen(stack)) stack.push(groupResult)
  else result.push(groupResult)
}

const processInput = (input, mathFn) =>
  input.map(equation => {
    let equationResult = []
    let stack = []

    const eqArr = [...equation].filter(c => c !== ' ')
    eqArr.forEach(c => {
      if (stack.length === 0 && c !== OPEN_PAREN) {
        equationResult.push(c)
      } else if (c === CLOSED_PAREN) {
        processGroup(equationResult, stack, mathFn)
      } else {
        stack.push(c)
      }
    })

    return part1Math(equationResult)
  })

const reduceResults = results => results.reduce((sum, r) => sum + r)
const input = require('fs')
  .readFileSync('./day_18/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

const part1Results = processInput(input, part1Math)
const part1Answer = reduceResults(part1Results)

const part2Results = processInput(input, part2Math)
const part2Answer = reduceResults(part2Results)

console.log({ part1Answer, part2Answer })
