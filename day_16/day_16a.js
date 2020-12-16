const [rulesGr, myTicketGr, nearbyTicketsGr] = require('fs')
  .readFileSync('./day_16/input.txt', 'utf8')
  .split(/\r?\n\r?\n/)
  .filter(d => d)

const rules = rulesGr.split(/\r?\n/).map(g => {
  const [rule, ranges] = g.split(': ')
  const rangeArr = ranges.split(' or ')
  const rangeSplits = rangeArr.map(r => r.split('-').map(n => parseInt(n)))
  return { rule, ranges: rangeSplits }
})

const myTicket = myTicketGr
  .split(/\r?\n/)[1]
  .split(',')
  .map(n => parseInt(n))

const nearbyTickets = nearbyTicketsGr
  .split(/\r?\n/)
  .slice(1)
  .map(t => t.split(',').map(n => parseInt(n)))

const goodTickets = nearbyTickets.filter(t =>
  t.every(n => {
    return rules.some(r =>
      r.ranges.some(([lower, upper]) => n >= lower && n <= upper)
    )
  })
)

let invalidVals = []
nearbyTickets.forEach(t => {
  let ticketInvalidValues = t.filter(n =>
    rules.every(r => r.ranges.every(([lower, upper]) => n < lower || n > upper))
  )
  invalidVals.push(...ticketInvalidValues)
})

console.log({
  goodTickets,
  invalidVals,
  answer: invalidVals.reduce((sum, v) => sum + v)
})
