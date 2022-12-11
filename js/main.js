
const validQty = (qty, message) => {
  while (isNaN(qty) || qty <= 0) {
    alert('You must enter a valid amount!')

    qty = parseInt(prompt(message));
  }

  return parseInt(qty);
};

const validCategory = (category, message, nameCategories, categories) => {
  while (!nameCategories.includes(category)) {
    alert('The entered category is invalid!')

    category = prompt(message);
  }

  return categories.find(c => c.name === category);
};

const calculateTotal = (records, categories) => {
  const result = {
    total: 0,
  }
  const resultCategory = categories.reduce((acc, category) => {
    acc[category.name] = 0;

    return acc;
  }, {})

  records.forEach(r => {
    result.total += r.value
    resultCategory[r.category.name] += r.value
  })

  result.categories = Object.keys(resultCategory).map(key => ({
    name: key,
    value: resultCategory[key],
  }))

  result.highest = result.categories.sort((a, b) => b.value - a.value)[0].name

  return result
}

const calculateCashFlow = (incomes, expenses) => {
  const incomeResult = calculateTotal(incomes, incomeCategory)
  const expenseResult = calculateTotal(expenses, expenseCategory)

  const flow = incomeResult.total - expenseResult.total;
  const usd = Intl.NumberFormat('en-US');

  let result = `\nYour cash flow is $${usd.format(flow)}\n\n`

  result += `Total incomes:$${usd.format(incomeResult.total)}\n`
  result += `Total expenses:$${usd.format(expenseResult.total)}\n\n`

  result += `Total income by category:\n`
  expenseResult.categories.forEach(c => {
    result += `- ${c.name}:$${usd.format(c.value)}\n`
  })

  result += `\nThe category with the highest income is: ${incomeResult.highest}\n\n`

  result += `Total expense by category:\n`
  expenseResult.categories.forEach(c => {
    result += `- ${c.name}:$${usd.format(c.value)}\n`
  })

  result += `\nThe category with the highest expense is: ${expenseResult.highest}\n`

  alert(result);
}

const get = (type, categories) => {
  const accumulator = [];
  const nameCategories = categories.map(c => c.name)

  let continueToIncurExpenses = false;
  do {
    const messageCategory = `Enter the ${type} category (${nameCategories.join(', ')}):`
    const messageValue = `Enter your ${type} value:`;
    const category = validCategory(prompt(messageCategory), messageCategory, nameCategories, categories);
    const value = validQty(prompt(messageValue), messageValue);

    accumulator.push({ value, category });

    continueToIncurExpenses = confirm(`Do you have any other ${type} to log in?`)
  } while (continueToIncurExpenses)

  return accumulator
}

const main = () => {
  alert('To begin calculating your monthly cash flow, You must first enter your income')
  const incomes = get('income', incomeCategory)
  alert('Now, to calculate the flow calculation, you must enter at least 1 expense.')
  const expenses = get('expense', expenseCategory, true)

  calculateCashFlow(incomes, expenses)
}

main();
