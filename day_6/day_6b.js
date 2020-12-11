require('fs').readFile('./day_6/input.txt', 'utf8', (err, data) => {
  console.log(
    'The sum is:',
    data.split('\n\n').reduce(
      (totalCount, group) =>
        totalCount +
        group
          .split('\n')
          .filter(g => g)
          .reduce((resultArr, person, i, a) => {
            if (a.length === 1) {
              resultArr.push(...person)
            } else {
              ;[...person]
                .filter(r => !resultArr.includes(r))
                .forEach(response => {
                  if (
                    [...a.slice(0, i), ...a.slice(i + 1)].every(otherPerson =>
                      otherPerson.includes(response)
                    )
                  ) {
                    resultArr.push(response)
                  }
                })
            }

            return resultArr
          }, []).length,
      0
    )
  )
})
