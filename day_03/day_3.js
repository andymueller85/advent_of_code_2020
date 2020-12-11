require('fs').readFile('./day_03/input.txt', 'utf8', (err, data) => {
  const input = data.split('\n').filter(d => d)

  const t = (down, right) => {
    const lastColumnIndex = input[0].length - 1
    let colNum = 0
    let rowNum = 0
    let treeCount = 0

    while (rowNum < input.length - 1) {
      rowNum += down
      colNum =
        colNum + right <= lastColumnIndex
          ? colNum + right
          : colNum - lastColumnIndex + right - 1
      if (input[rowNum][colNum] === '#') treeCount++
    }

    return treeCount
  }

  console.log('Answer:', t(1, 1) * t(1, 3) * t(1, 5) * t(1, 7) * t(2, 1))
})
