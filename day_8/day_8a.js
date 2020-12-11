require('fs').readFile('./day_8/input.txt', 'utf8', (err, data) => {
  const scrubbedInput = data
    .split('\n')
    .filter(d => d)
    .map(inputLine => {
      const [inst, arg] = inputLine.split(' ')
      return [inst, parseInt(arg, 10)]
    })
    .filter(d => d)

  let i = 0
  let acc = 0
  const visited = []

  while (!visited.includes(i)) {
    visited.push(i)
    const [instruction, argument] = scrubbedInput[i]

    switch (instruction) {
      case 'acc':
        i++
        acc += argument
        break
      case 'jmp':
        i += argument
        break
      default:
        i++
    }
  }

  console.log({ acc })
})
