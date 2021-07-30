export function setLocalStorage(key, token) {
  localStorage.setItem(key, token);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}
