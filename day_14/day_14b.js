const input = require('fs')
  .readFileSync('./day_14/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .reduce((acc, cur, i, a) => {
    const isMask = l => l.startsWith('mask')
    let instrGroup = []
    if (isMask(cur)) {
      const nextGroupIndex = a.findIndex((l, curI) => curI > i && isMask(l))
      instrGroup = a.slice(i, nextGroupIndex === -1 ? a.length : nextGroupIndex)
      const mask = instrGroup[0].replace('mask = ', '')
      const instructions = instrGroup.slice(1).map(g => {
        const [addr, val] = g.split(' = ')
        return [addr.replace('mem[', '').replace(']', ''), parseInt(val, 10)]
      })

      return [...acc, { mask, instructions }]
    }
    return acc
  }, [])

const replaceAtIndex = (str, val, i) =>
  `${str.slice(0, i)}${val}${str.slice(i + 1)}`

const getMemAddrs = addrs => {
  const addrWithFloater = addrs.find(a => [...a].includes('X'))

  if (!addrWithFloater) {
    return addrs
  } else {
    const firstFloater = [...addrWithFloater].findIndex(c => c === 'X')

    return getMemAddrs([
      ...addrs.filter(a => a !== addrWithFloater),
      replaceAtIndex(addrWithFloater, '0', firstFloater),
      replaceAtIndex(addrWithFloater, '1', firstFloater)
    ])
  }
}

const applyMask = (val, mask) => {
  const binaryVal = Number(val).toString(2)
  const revMask = mask.split('').reverse()
  const revInstr = [
    ...binaryVal.split('').reverse(),
    ...Array.from({ length: 36 - binaryVal.length }, _ => '0')
  ]

  return revInstr
    .map((r, i) => (revMask[i] !== '0' ? revMask[i] : r))
    .reverse()
    .join('')
}

let memory = {}
input.forEach(({ mask, instructions }) => {
  instructions.forEach(([addr, val]) => {
    const addrs = getMemAddrs([applyMask(addr, mask)])
    memory = {
      ...memory,
      ...addrs.reduce(
        (acc, cur) => ({
          ...acc,
          [parseInt(cur, 2)]: val
        }),
        {}
      )
    }
  })
})

console.log(
  'sum',
  Object.values(memory).reduce((acc, m) => acc + m)
)
