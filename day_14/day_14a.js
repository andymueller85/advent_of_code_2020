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

const applyMask = (val, mask) => {
  const binaryVal = Number(val).toString(2)

  return parseInt(
    Array.from({ length: 36 - binaryVal.length }, _ => '0')
      .concat(binaryVal.split(''))
      .map((r, i) => (mask[i] !== 'X' ? mask[i] : r))
      .join(''),
    2
  )
}

let memory = {}
input.forEach(({ mask, instructions }) => {
  instructions.forEach(([addr, val]) => {
    memory = { ...memory, [addr]: applyMask(val, mask) }
  })
})

console.log(
  'sum',
  Object.values(memory).reduce((acc, m) => acc + m) // 9615006043476
)
