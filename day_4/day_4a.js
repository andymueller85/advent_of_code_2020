require('fs').readFile('./day_4/input.txt', 'utf8', (err, data) => {
  const input = data.split('\n\n')

  console.log(
    'Valid passports:',
    input.filter(pass => {
      const passportLines = pass.split('\n')

      const f = passportLines.reduce((acc, cur) => {
        const lineFields = cur.split(' ')
        lineFields.forEach(f => {
          const [k, v] = f.split(':')
          acc = { ...acc, [k]: v }
        })

        return acc
      }, {})

      return f.byr && f.iyr && f.eyr && f.hgt && f.hcl && f.ecl && f.pid
    }).length
  )
})
