let records = [] // in case from storage is updated in DOMContentLoaded event, this is replace from storage
const recordsContainer = document.getElementById('recordsContainer')

const addRecord = (record) => {
  // create unique id without library
  record.id = 'id' + Math.random().toString(16).slice(2)

  records.unshift(record) // add in first position to display in desc order

  setToStorage('records', records)
  drawRecords(records)
  cashFlow(records)
}

const drawRecords = (records) => {
  if (records.length === 0) {
    recordsContainer.innerHTML = 'Empty...'
    return
  }

  recordsContainer.innerHTML = ''

  records.forEach((record) => {
    const cardRecord = document.createElement('div')
    cardRecord.classList.add('card', 'w-75', 'mb-3')
    cardRecord.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">$${dollarFormat(record.amount)}</h5>
        <p class="card-text">type: ${record.type}</p>
        <p class="card-text">category: ${record.category.name}</p>
        <!-- <a id="${record.id}" href="#" class="btn btn-primary edit">Edit</a> -->
        <a id="${record.id}" href="#" class="btn btn-danger delete">Delete</a>
      </div>
    `

    recordsContainer.appendChild(cardRecord)
  })
}

recordsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    deleteRecord(e.target.id)
  }
})

const deleteRecord = (recordId) => {
  const recordIndex = records.findIndex(r => r.id === recordId)

  records.splice(recordIndex, 1)

  setToStorage('records', records)
  drawRecords(records)
  cashFlow(records)
}
