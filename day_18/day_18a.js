const input = require('fs')
  .readFileSync('./day_18/input_dev.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)

console.log({ input })

input.forEach(equation => {
  // build a tree like
  // [{ val: 1, operand: '+'}, {val: [{val: 2, operand: '*'}, {val: 3, operand: ''}], operand: '+'... }]
  let tree = []

  ;[...equation]
    .filter(c => c !== ' ')
    .forEach(c => {
      const char = parseInt(c)
    })
})
