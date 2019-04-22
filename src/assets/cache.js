function setCache (name, data) {
  console.log(typeof data)
  localStorage.setItem(name, JSON.stringify(data))
}

function getCache (name) {
  return JSON.parse(localStorage.getItem(name))
}

function setSessionStorage (name, data) {
  sessionStorage.setItem(name, JSON.stringify(data))
}

function getSessionStorage (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export default {
  setCache,
  getCache,
  setSessionStorage,
  getSessionStorage
}
