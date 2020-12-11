require('fs').readFile('./day_06/input.txt', 'utf8', (_, data) => {
  console.log(
    'The sum is:',
    data.split('\n\n').reduce(
      (totalCount, group) =>
        totalCount +
        group
          .split('\n')
          .filter(g => g)
          .reduce((uniqueArr, person) => {
            ;[...person].forEach(response => {
              if (!uniqueArr.includes(response)) {
                uniqueArr.push(response)
              }
            })
            return uniqueArr
          }, []).length,
      0
    )
  )
})
