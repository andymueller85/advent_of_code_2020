require('fs').readFile('./day_08/input.txt', 'utf8', (err, data) => {
  const scrubbedInput = data
    .split('\n')
    .filter(d => d)
    .map(inputLine => {
      const [inst, arg] = inputLine.split(' ')
      return [inst, parseInt(arg, 10)]
    })
    .filter(d => d)

  const runIt = input => {
    let acc = 0
    let i = 0
    let visited = []

    while (!visited.includes(i) && i < input.length) {
      visited.push(i)
      const [instruction, argument] = input[i]

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

    return !visited.includes(i) ? acc : 0
  }

  let currentPos = 0
  let acc = 0
  const scrubbedInputMap = scrubbedInput.map(i => i[0])

  while (acc === 0) {
    const getNextNopOrJmp = () => {
      const nextJmp = scrubbedInputMap.indexOf('jmp', currentPos + 1)
      const nextNop = scrubbedInputMap.indexOf('nop', currentPos + 1)

      if (nextNop === -1) return nextJmp
      if (nextJmp === -1) return nextNop
      return Math.min(nextNop, nextJmp)
    }

    const swaparoo = element => {
      const [inst, arg] = element
      return inst === 'jmp' ? ['nop', arg] : ['jmp', arg]
    }

    let nextNopOrJmp = 0
    let swappedInput = scrubbedInput

    if (currentPos > 0) {
      nextNopOrJmp = getNextNopOrJmp()
      swappedInput = [
        ...scrubbedInput.slice(0, nextNopOrJmp),
        swaparoo(scrubbedInput[nextNopOrJmp]),
        ...scrubbedInput.slice(nextNopOrJmp + 1)
      ]
      currentPos = nextNopOrJmp
    } else {
      currentPos++
    }

    acc = runIt(swappedInput)
  }

  console.log({ acc })
})
