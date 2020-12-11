require('fs').readFile('./day_01/input.txt', 'utf8', (_, data) => {
  const input = data
    .split('\n')
    .filter(d => d)
    .map(d => parseInt(d, 10))
    .sort((a, b) => a - b)

  // find the index of the element whose sum with the lowest two elements puts us over 2020
  const stopIndex = input.findIndex((val, i, a) => a[0] + a[1] + a[i] >= 2020)
  const choppedInput = input.slice(0, stopIndex)

  const addEmUp = startVal =>
    choppedInput.some((baseVal, i, a) => {
      let answerFound = false

      a.slice(i + 1).some(compareVal => {
        const sum = startVal + baseVal + compareVal

        if (sum === 2020) {
          console.log('The answer is:', startVal * baseVal * compareVal)
          return (answerFound = true)
        }

        if (sum > 2020) return true
      })

      return answerFound
    })

  choppedInput.sort((a, b) => b - a).some(addEmUp)
})
