require('fs').readFile('./day_07/input.txt', 'utf8', (err, data) => {
  const nestingDoll = data
    .split('\n')
    .filter(d => d)
    .map(rule => {
      const [rawBag, bagRules] = rule.split(' contain ')
      const color = rawBag.replace(' bags', '')
      const rules = bagRules
        .split(', ')
        .map(r => r.replace(' bags', '').replace(' bag', '').replace('.', ''))
        .filter(r => r !== 'no other')
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur.substring(cur.indexOf(' ') + 1)]: parseInt(cur)
          }),
          {}
        )

      return { color, rules }
    })

  const unpackBag = (color, count) => {
    const { rules } = nestingDoll.find(d => d.color === color)
    return Object.keys(rules).reduce(
      (acc, cur) =>
        acc + count * rules[cur] + unpackBag(cur, count * rules[cur]),
      0
    )
  }

  console.log('The answer:', unpackBag('shiny gold', 1))
})
