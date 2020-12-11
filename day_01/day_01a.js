require('fs').readFile('./day_01/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let answer = 0

  data
    .split('\n')
    .filter(d => d)
    .map(d => parseInt(d, 10))
    .some((baseVal, i, a) =>
      a.slice(i + 1).some(compareVal => {
        if (baseVal + compareVal === 2020) {
          return (answer = baseVal * compareVal)
        }
      })
    )

  console.log(answer)
})
