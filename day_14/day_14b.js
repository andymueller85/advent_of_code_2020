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

const replaceAtIndex = (str, i, val) =>
  `${str.slice(0, i)}${val}${str.slice(i + 1)}`

const getMemAddrs = addrs => {
  const addr = addrs.find(a => [...a].includes('X'))
  if (!addr) return addrs

  const firstFloatIdx = [...addr].findIndex(c => c === 'X')
  return getMemAddrs([
    ...addrs.filter(a => a !== addr),
    replaceAtIndex(addr, firstFloatIdx, '0'),
    replaceAtIndex(addr, firstFloatIdx, '1')
  ])
}

const applyMask = (val, mask) => {
  const binaryVal = Number(val).toString(2)
  const maskArr = mask.split('')

  return (
    Array.from({ length: 36 - binaryVal.length }, _ => '0')
      .concat(binaryVal.split(''))
      .map((r, i) => (maskArr[i] !== '0' ? maskArr[i] : r))
      .join('')
  )
}

let memory = {}
input.forEach(({ mask, instructions }) => {
  instructions.forEach(([addr, val]) => {
    const addrs = getMemAddrs([applyMask(addr, mask)])
    memory = {
      ...memory,
      ...addrs.reduce((acc, cur) => ({ ...acc, [parseInt(cur, 2)]: val }), {})
    }
  })
})

console.log(
  'sum',
  Object.values(memory).reduce((acc, m) => acc + m) // 4275496544925
)
