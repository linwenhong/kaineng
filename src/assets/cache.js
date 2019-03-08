function getUser (key) {
  if (key) {
    return JSON.parse(localStorage.getItem('user'))[key]
  }
  return JSON.parse(localStorage.getItem('user'))
}

function setLocalStorage (name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function getLocalStorage (name) {
  return JSON.parse(localStorage.getItem(name))
}

function setSessionStorage (name, data) {
  sessionStorage.setItem(name, JSON.stringify(data))
}

function getSessionStorage (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export default {
  getUser,
  setLocalStorage,
  getLocalStorage,
  setSessionStorage,
  getSessionStorage
}
