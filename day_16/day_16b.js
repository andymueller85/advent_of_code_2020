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

const goodTickets = nearbyTicketsGr
  .split(/\r?\n/)
  .slice(1)
  .map(t => t.split(',').map(n => parseInt(n)))
  .filter(t =>
    t.every(n => {
      return rules.some(r =>
        r.ranges.some(([lower, upper]) => n >= lower && n <= upper)
      )
    })
  )

const getLabels = (possibleLabels, ticketLength) => {
  const knownCategories = possibleLabels
    .filter(p => p.length === 1)
    .map(p => p[0])

  if (knownCategories.length === ticketLength) {
    return possibleLabels
  }

  return getLabels(
    possibleLabels.map(p =>
      p.length === 1 ? p : p.filter(q => !knownCategories.includes(q))
    ),
    ticketLength
  )
}

let startTicketPositions = myTicket.map((_, i) =>
  rules
    .filter(r =>
      goodTickets
        .map(g => g[i])
        .every(n => r.ranges.some(([lower, upper]) => lower <= n && n <= upper))
    )
    .map(r => r.rule)
)

const labels = getLabels(startTicketPositions, myTicket.length)
const myTicketWithLabels = myTicket.map((t, i) => [...labels[i], t])

console.log({
  myTicketWithLabels,
  answer: myTicketWithLabels
    .filter(([label, _]) => label.startsWith('departure'))
    .reduce((acc, [_, val]) => acc * val, 1)
})
