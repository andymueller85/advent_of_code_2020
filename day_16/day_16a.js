const [rulesGr, _, nearbyTicketsGr] = require('fs')
  .readFileSync('./day_16/input.txt', 'utf8')
  .split(/\r?\n\r?\n/)
  .filter(d => d)

const rules = rulesGr.split(/\r?\n/).map(g => {
  const [rule, ranges] = g.split(': ')
  const rangeArr = ranges.split(' or ')
  const rangeSplits = rangeArr.map(r => r.split('-').map(n => parseInt(n)))
  return { rule, ranges: rangeSplits }
})

let invalidVals = nearbyTicketsGr
  .split(/\r?\n/)
  .slice(1)
  .map(t => t.split(',').map(n => parseInt(n)))
  .reduce((acc, t) => {
    const ticketInvalidValues = t.filter(n =>
      rules.every(r =>
        r.ranges.every(([lower, upper]) => n < lower || n > upper)
      )
    )
    return [...acc, ...ticketInvalidValues]
  }, [])

console.log({
  invalidVals,
  answer: invalidVals.reduce((sum, v) => sum + v)
})
