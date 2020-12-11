require('fs').readFile('./day_09/input.txt', 'utf8', (err, data) => {
  const input = data
    .split('\n')
    .filter(d => d)
    .map(d => parseInt(d, 10))
  const preambleLength = 25

  const isValid = (target, arr) =>
    arr.some((lowerEl, i, a) =>
      a.slice(i + 1).some(upperEl => lowerEl + upperEl === target)
    )

  const doPart2 = target => {
    let upperIndex = 0

    const lowerIndex = input.findIndex((_, i) => {
      upperIndex = input.findIndex(
        (_, j) =>
          j > i &&
          input.slice(i, j + 1).reduce((acc, cur) => acc + cur) === target
      )
      return upperIndex !== -1
    })

    const range = input.slice(lowerIndex, upperIndex)
    return Math.min(...range) + Math.max(...range)
  }

  const part1Answer = input.find(
    (target, i, a) =>
      i > preambleLength && !isValid(target, a.slice(i - preambleLength, i))
  )

  console.log('part 1 answer:', part1Answer)
  console.log('part 2 answer:', doPart2(part1Answer))
})
