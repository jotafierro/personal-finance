document.addEventListener('DOMContentLoaded', () => {
  const recordsInStorage = getFromStorage('records')

  if (!recordsInStorage || !recordsInStorage.length) {
    cashFlow()
    return
  }

  // records are updated here to avoid data management problems
  records = recordsInStorage
  drawRecords(recordsInStorage)
  cashFlow(recordsInStorage)
})
