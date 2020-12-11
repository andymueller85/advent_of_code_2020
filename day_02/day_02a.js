require('fs').readFile('./day_02/input.txt', 'utf8', (err, data) => {
  console.log(
    'Valid password count:',
    data
      .split('\n')
      .filter(d => d)
      .filter(inputLine => {
        const [range, char, password] = inputLine.split(' ')
        const [low, high] = range.split('-')

        const { length } = [...password].filter(c => c === char.substring(0, 1))
        return length >= low && length <= high
      }).length
  )
})
