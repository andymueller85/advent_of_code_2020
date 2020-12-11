const bisect = (low, high) => (high - low + 1) / 2
const getNewLow = (low, high) => low + bisect(low, high)
const getNewHigh = (low, high) => getNewLow(low, high) - 1
const getPosition = (code, highKey, startObj) =>
  code.reduce(
    (acc, cur) =>
      cur === highKey
        ? { ...acc, high: getNewHigh(acc.low, acc.high) }
        : { ...acc, low: getNewLow(acc.low, acc.high) },
    startObj
  ).low // low & high should be the same here.
const getRow = pass =>
  getPosition([...pass].slice(0, 7), 'F', { low: 0, high: 127 })
const getSeat = pass =>
  getPosition([...pass].slice(7), 'L', { low: 0, high: 7 })

require('fs').readFile('./day_5/input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const input = data.split('\n').filter(d => d)

  // part 1
  console.log(
    'Highest Seat ID:',
    input.reduce((max, pass) => {
      const row = getRow(pass)
      const seat = getSeat(pass)
      const seatId = row * 8 + seat

      return seatId > max ? seatId : max
    }, 0)
  )

  // part 2
  const found = input
    .map(pass => {
      const row = getRow(pass)
      const seat = getSeat(pass)
      return { row, seat, id: row * 8 + seat }
    })
    .sort((a, b) => (a.row === b.row ? a.seat - b.seat : a.row - b.row))
    .some((seatObj, i, a) => {
      if (seatObj.id + 1 !== a[i + 1].id) {
        console.log('My Seat:', seatObj.id + 1)
        return true
      }
    })

  if (!found) console.log('¯\\_(ツ)_/¯')
})
