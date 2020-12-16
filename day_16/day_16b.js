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

const getNewTicketPositions = ticketPositions => {
  const knownCategories = ticketPositions
    .filter(p => p.length === 1)
    .map(p => p[0])

  if (knownCategories.length === myTicket.length) {
    // we're done, return
    return ticketPositions
  }

  let newTicketPostions = ticketPositions.map(p =>
    p.length === 1 ? p : p.filter(q => !knownCategories.includes(q))
  )

  return getNewTicketPositions(newTicketPostions)
}

let startTicketPositions = myTicket.map(t => [])

for (let i = 0; i < startTicketPositions.length; i++) {
  let numsAtPosition = goodTickets.map(t => t[i])

  let validLabels = rules.filter(r =>
    numsAtPosition.every(n =>
      r.ranges.some(([lower, upper]) => lower <= n && n <= upper)
    )
  )

  startTicketPositions[i].push(...validLabels.map(l => l.rule))
}

const labels = getNewTicketPositions(startTicketPositions)
const myTicketWithLabels = myTicket.reduce(
  (acc, n, i) => ({
    ...acc,
    [labels[i]]: n
  }),
  {}
)

console.log({
  myTicketWithLabels,
  goodTickets,
  invalidVals,
  answer: Object.keys(myTicketWithLabels)
    .filter(k => k.startsWith('departure'))
    .map(k => myTicketWithLabels[k])
    .reduce((result, v) => result * v)
})
