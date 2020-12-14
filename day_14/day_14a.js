const input = require('fs')
  .readFileSync('./day_14/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)
  .reduce((acc, cur, i, a) => {
    let instrGroup = []
    if (cur.startsWith('mask')) {
      const nextGroupIndex = a.findIndex(
        (l, curI) => curI > i && l.startsWith('mask')
      )
      instrGroup = a.slice(i, nextGroupIndex === -1 ? a.length : nextGroupIndex)
      const mask = instrGroup[0].replace('mask = ', '')

      const instructions = instrGroup.slice(1).map(a => {
        const [addr, val] = a.split(' = ')

        return [addr.replace('mem[', '').replace(']', ''), parseInt(val, 10)]
      })

      return [...acc, { mask, instructions }]
    }
    return acc
  }, [])

let mem = {}

const applyMask = (instr, mask) => {
  revMask = mask.split('').reverse()
  revInstr = [
    ...instr.split('').reverse(),
    ...Array.from({ length: 36 - instr.length }, _ => '0')
  ]

  return parseInt(
    revInstr
      .map((r, i) => (r = revMask[i] !== 'X' ? revMask[i] : r))
      .reverse()
      .join(''),
    2
  )
}
input.forEach(({ mask, instructions }) => {
  instructions.forEach(([addr, val]) => {
    mem = { ...mem, [addr]: applyMask(val.toString(2), mask) }
  })
})

const sum = Object.values(mem).reduce((sum, m) => sum + m)

console.log({ sum })
