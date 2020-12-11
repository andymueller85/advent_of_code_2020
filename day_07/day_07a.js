require('fs').readFile('./day_07/input.txt', 'utf8', (_, data) => {
  const nestingDoll = data
    .split('\n')
    .filter(d => d)
    .map(rule => {
      const [rawBag, bagRules] = rule.split(' contain ')
      const color = rawBag.replace(' bags', '')
      const rules = bagRules
        .split(', ')
        .map(r => r.replace(' bags', '').replace(' bag', '').replace('.', ''))
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur.substring(cur.indexOf(' ') + 1)]: parseInt(cur)
          }),
          {}
        )

      return { color, rules }
    })

  const outerBags = []
  const traverse = color => {
    nestingDoll
      .filter(t => Object.keys(t.rules).includes(color))
      .forEach(r => {
        if (!outerBags.includes(r.color)) {
          outerBags.push(r.color)
        }
        traverse(r.color)
      })
  }

  traverse('shiny gold')
  console.log({ outerBags, count: outerBags.length })
})
