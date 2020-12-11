require('fs').readFile('./day_10/input.txt', 'utf8', (err, data) => {
  const input = data
    .split('\n')
    .filter(d => d)
    .map(d => parseInt(d, 10))
    .sort((a, b) => a - b)
  input.push(input[input.length - 1] + 3)

  const diffs = input.map((jolts, i, a) => (i === 0 ? jolts : jolts - a[i - 1]))
  console.log(
    'answer:',
    diffs.filter(d => d === 1).length * diffs.filter(d => d === 3).length
  )
})
