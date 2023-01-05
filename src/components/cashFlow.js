const totalCashFlow = document.getElementById('totalCashFlow')
const totalIncomes = document.getElementById('totalIncomes')
const totalExpenses = document.getElementById('totalExpenses')
const totalIncomeByCategory = document.getElementById('totalIncomeByCategory')
const highestIncome = document.getElementById('highestIncome')
const totalExpenseByCategory = document.getElementById('totalExpenseByCategory')
const highestExpense = document.getElementById('highestExpense')

const calculateTotal = (records, categories) => {
  const result = {
    total: 0,
  }
  const resultCategory = categories.reduce((acc, category) => {
    acc[category.id] = 0;

    return acc;
  }, {})

  records.forEach(r => {
    result.total += r.amount
    resultCategory[r.category.id] += r.amount
  })

  result.categories = Object.keys(resultCategory).map(key => ({
    id: key,
    amount: resultCategory[key],
  }))

  if (records.length > 0) {
    result.highest = result.categories.sort((a, b) => b.amount - a.amount)[0].id
  } else {
    result.highest = '?'
  }

  return result
}

const cashFlow = (records = []) => {
  if (records.length > 0) {
    const incomeResult = calculateTotal(
      records.filter(r => r.type === 'income'),
      categories['income']
    )
    const expenseResult = calculateTotal(
      records.filter(r => r.type === 'expense'),
      categories['expense']
    )

    drawCashFlow(incomeResult, expenseResult)
  } else {
    // default
    drawDefaultCashFlow()
  }
}

const drawDefaultCashFlow = () => {
  totalCashFlow.innerText = '?'
  totalIncomes.innerText = '?'
  totalExpenses.innerText = '?'
  highestIncome.innerText = '?'
  highestExpense.innerText = '?'

  totalIncomeByCategory.innerHTML = ''
  categories['income'].forEach(c => {
    const li = document.createElement('li')
    li.innerHTML = `${c.name} : <b>?</b>`
    totalIncomeByCategory.appendChild(li)
  })

  totalExpenseByCategory.innerHTML = ''
  categories['expense'].forEach(c => {
    const li = document.createElement('li')
    li.innerHTML = `${c.name} : <b>?</b>`
    totalExpenseByCategory.appendChild(li)
  })
}

const drawCashFlow = (incomeResult, expenseResult) => {
  totalCashFlow.innerText = '$' + dollarFormat(incomeResult.total - expenseResult.total)

  totalIncomes.innerText = '$' + dollarFormat(incomeResult.total)
  totalExpenses.innerText = '$' + dollarFormat(expenseResult.total)

  highestIncome.innerText = incomeResult.highest
  highestExpense.innerText = expenseResult.highest

  totalIncomeByCategory.innerHTML = ''
  categories['income'].forEach(c => {
    const result = incomeResult.categories.find(rc => rc.id === c.id)
    const li = document.createElement('li')
    li.innerHTML = `${c.name} : <b>$${dollarFormat(result.amount)}</b>`
    totalIncomeByCategory.appendChild(li)
  })

  totalExpenseByCategory.innerHTML = ''
  categories['expense'].forEach(c => {
    const result = expenseResult.categories.find(rc => rc.id === c.id)
    const li = document.createElement('li')
    li.innerHTML = `${c.name} : <b>$${dollarFormat(result.amount)}</b>`
    totalExpenseByCategory.appendChild(li)
  })
}
