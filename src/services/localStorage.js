export function setLocalStorageItem(key, token) {
  localStorage.setItem(key, token);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}
