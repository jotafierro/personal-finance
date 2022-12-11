
const validQty = (qty, message) => {
  while (isNaN(qty) || qty <= 0) {
    alert('You must enter a valid amount!')

    qty = parseInt(prompt(message));
  }

  return parseInt(qty);
};

const validCategory = (category, message, nameCategories) => {
  while (!nameCategories.includes(category)) {
    alert('The entered category is invalid!')

    category = prompt(message);
  }

  return categories.find(c => c.name === category);
};

const calculateCashFlow = (salary, expenses) => {
  let totalExpenses = 0;
  let totalFood = 0;
  let totalHealth = 0;
  let totalHome = 0;
  let totalOther = 0;

  expenses.forEach(({ expense, category }) => {
    if (category.name === 'food') totalFood += expense
    if (category.name === 'health') totalHealth += expense
    if (category.name === 'home') totalHome += expense
    if (category.name === 'other') totalOther += expense

    totalExpenses += expense;
  });

  const flow = salary - totalExpenses;
  const usd = Intl.NumberFormat('en-US');

  let result = `\nYour cash flow is $${usd.format(flow)}\n\n`
  result += `salary:$${usd.format(salary)}\n`
  result += `total expenses:$${usd.format(totalExpenses)}\n\n`
  result += `total food:$${usd.format(totalFood)}\n`
  result += `total health:$${usd.format(totalHealth)}\n`
  result += `total home:$${usd.format(totalHome)}\n`
  result += `total other:$${usd.format(totalOther)}\n\n`

  const highestExpenditure = [
    { category: 'food', value: totalFood },
    { category: 'health', value: totalHealth },
    { category: 'home', value: totalHome },
    { category: 'other', value: totalOther }
  ].sort((a, b) => b.value - a.value)[0]

  result += `the category with the highest expenditure is: ${highestExpenditure.category}\n`

  alert(result);
}

const main = () => {
  const nameCategories = categories.map(c => c.name)
  const messageSalary = 'To begin calculating your monthly cash flow, you must enter your salary ($usd):'
  const salary = validQty(prompt(messageSalary), messageSalary);
  const expenses = []

  let continueToIncurExpenses = false;
  do {
    const messageExpense = 'Enter your expense value:';
    const messageCategory = `Enter the expense category (${nameCategories.join(', ')}):`
    const category = validCategory(prompt(messageCategory), messageCategory, nameCategories);
    const expense = validQty(prompt(messageExpense), messageExpense);

    expenses.push({ expense, category });

    calculateCashFlow(salary, expenses)

    continueToIncurExpenses = confirm('Do you have any other expenses to log in?')
  } while (continueToIncurExpenses)
}

main();
