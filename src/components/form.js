const selectType = document.getElementById('selectType')
const selectCategory = document.getElementById('selectCategory')
const inputAmount = document.getElementById('inputAmount')
const btnRegister = document.getElementById('btnRegister')
const chooseText = 'Choose...'

selectType.addEventListener('change', (e) => {
  if (selectType.value === chooseText) {
    selectCategory.disabled = true;
    selectCategory.value = chooseText;
    return;
  }

  selectCategory.disabled = false
  selectCategory.innerHTML = ''

  const defaultOption = document.createElement('option')
  defaultOption.selected = true
  defaultOption.innerText = chooseText

  selectCategory.appendChild(defaultOption)

  categories[selectType.value].forEach(category => {
    const option = document.createElement('option')

    option.setAttribute('value', category.id)
    option.innerText = category.name

    selectCategory.appendChild(option)
  });
})

const validateToActiveRegisterBtn = () => {
  if (
    selectType.value !== chooseText
    && selectCategory.value !== chooseText
    && inputAmount.value !== ''
  ) {
    btnRegister.disabled = false
  } else {
    btnRegister.disabled = true
  }
}

selectType.addEventListener('change', validateToActiveRegisterBtn)
selectCategory.addEventListener('change', validateToActiveRegisterBtn)
inputAmount.addEventListener('change', validateToActiveRegisterBtn)

btnRegister.addEventListener('click', (e) => {
  e.preventDefault()

  addRecord({
    type: selectType.value,
    category: categories[selectType.value].find(c => c.id === selectCategory.value),
    amount: Number(inputAmount.value)
  })

  // clean form
  selectType.value = chooseText
  selectCategory.value = chooseText
  inputAmount.value = ''

  btnRegister.disabled = true
  selectCategory.disabled = true
})
