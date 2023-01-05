const getFromStorage = (key) => {
  const value = localStorage.getItem(key)

  if (!value) return null

  return JSON.parse(value)
}

const setToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))
