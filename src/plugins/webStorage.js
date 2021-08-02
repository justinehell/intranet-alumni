import {
  setLocalStorageItem,
  removeLocalStorageItem,
} from '../services/localStorage';

export default function handleTokenInLocalStorage(store) {
  store.subscribe((mutation) => {
    if (mutation.type === 'auth/SET_TOKENS') {
      const payload = mutation.payload;
      setLocalStorageItem('accessToken', payload.accessToken);
      setLocalStorageItem('refreshToken', payload.refreshToken);
    }
    if (mutation.type === 'auth/REMOVE_TOKENS') {
      removeLocalStorageItem('accessToken');
      removeLocalStorageItem('refreshToken');
    }
  });
}
