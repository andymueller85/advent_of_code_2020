const input = require('fs')
  .readFileSync('./day_13/input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(d => d)[1]
  .split(',')
  .map(t => parseInt(t, 10) || t)

const getTimestamp = (busArr, minute, increment) => {
  let found = false

  while (!found) {
    found = busArr.every(
      (b, idx) =>
        !Number.isInteger(b) ||
        (Number.isInteger(b) && (minute + idx) % b === 0)
    )

    if (!found) {
      minute += increment
    } else {
      return input.length === busArr.length
        ? minute
        : getTimestamp(
            busArr.concat(
              ...input.slice(
                busArr.length,
                input.findIndex(
                  (b, idx) => idx >= busArr.length && Number.isInteger(b)
                ) + 1
              )
            ),
            minute,
            busArr.reduce((acc, b) => acc * (Number.isInteger(b) ? b : 1))
          )
    }
  }
}

console.log(
  'success!',
  getTimestamp(
    input.slice(0, input.findIndex((b, i) => i > 0 && Number.isInteger(b)) + 1),
    0,
    1
  )
)
