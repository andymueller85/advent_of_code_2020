const validYear = (val, min, max) =>
  val && parseInt(val) && val >= min && val <= max
const validHeight = val => {
  if (val && val.match(/^[0-9]*(cm|in)$/)) {
    const units = parseInt(val)
    return (
      (val.includes('cm') && units >= 150 && units <= 193) ||
      (val.includes('in') && units >= 59 && units <= 76)
    )
  }
  return false
}

require('fs').readFile('./day_04/input.txt', 'utf8', (err, data) => {
  console.log(
    'Valid passports:',
    data.split('\n\n').filter(pass => {
      const passportLines = pass.split('\n').filter(l => l)
      const f = passportLines.reduce((acc, cur) => {
        const lineFields = cur.split(' ')
        lineFields.forEach(f => {
          const [k, v] = f.split(':')
          acc = { ...acc, [k]: v }
        })

        return acc
      }, {})

      return (
        validYear(f.byr, 1920, 2002) &&
        validYear(f.iyr, 2010, 2020) &&
        validYear(f.eyr, 2020, 2030) &&
        validHeight(f.hgt) &&
        f.hcl &&
        f.hcl.match(/^#[a-zA-Z0-9]{6}$/) &&
        f.ecl &&
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(f.ecl) &&
        f.pid &&
        f.pid.match(/^\d{9}$/)
      )
    }).length
  )
})
