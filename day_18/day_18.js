const TIMES = '*'
const PLUS = '+'
const OPEN_PAREN = '('
const CLOSED_PAREN = ')'
const parenIsOpen = stack =>
  stack.filter(s => s === OPEN_PAREN).length >
  stack.filter(s => s === CLOSED_PAREN).length
const itemFound = v => v !== -1
const getNums = arr => arr.map(a => parseInt(a)).filter(a => !isNaN(a))
const getOperands = arr => arr.filter(a => [PLUS, TIMES].includes(a))

const part1Math = arr => {
  const nums = getNums(arr)
  const operands = getOperands(arr)

  let result = nums.shift()
  let num = nums.shift()

  operands.forEach(o => {
    if (o === PLUS) result += num
    if (o === TIMES) result *= num
    num = nums.shift()
  })

  return result
}

const part2Math = arr => {
  const nums = getNums(arr)
  const operands = getOperands(arr)

  // find groups of plusses and process them, then put them back in their place.
  let parenGroup = [...arr]
  let i = operands.findIndex(o => o === PLUS)
  while (itemFound(i)) {
    const nextTimes = operands.findIndex((o, idx) => idx > i && o === TIMES)

    parenGroup[i * 2] = nums
      .slice(i, nextTimes === -1 ? operands.length + 1 : nextTimes + 1)
      .reduce((sum, n) => sum + n)

    const grEnd = itemFound(nextTimes) ? nextTimes * 2 + 1 : parenGroup.length
    for (let j = i * 2 + 1; j < grEnd; j++) parenGroup[j] = '$' // just a placeholder value, no significance

    i = operands.findIndex(
      (o, idx) => itemFound(nextTimes) && idx > nextTimes && o === PLUS
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

const go = (input, mathFn) => {
  let results = []

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
        processGroup(equationResult, stack, mathFn)
      } else {
        stack.push(c)
      }
    })

    results.push(part1Math(equationResult))
    equationResult.splice(0, equationResult.length)
  })

  return results
}

const reduceResults = results => results.reduce((sum, r) => sum + r)
const input = require('fs')
  .readFileSync('./day_18/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

const part1Results = go(input, part1Math)
const part1Answer = reduceResults(part1Results)

const part2Results = go(input, part2Math)
const part2Answer = reduceResults(part2Results)

console.log({ part1Answer, part2Answer })
