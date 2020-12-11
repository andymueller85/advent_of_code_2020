require('fs').readFile('./day_02/input.txt', 'utf8', (err, data) => {
  console.log(
    'Valid password count:',
    data
      .split('\n')
      .filter(d => d)
      .filter(inputLine => {
        const [range, char, password] = inputLine.split(' ')
        const [pos1, pos2] = range.split('-')

        return (
          (password[pos1 - 1] === char[0] || password[pos2 - 1] === char[0]) &&
          (password[pos1 - 1] !== char[0] || password[pos2 - 1] !== char[0])
        )
      }).length
  )
})
