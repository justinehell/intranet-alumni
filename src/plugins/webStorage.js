import { setLocalStorage, removeLocalStorage } from '../services/localStorage';

export default function handleTokenInLocalStorage(store) {
  store.subscribe((mutation) => {
    if (mutation.type === 'auth/SET_TOKENS') {
      const payload = mutation.payload;
      setLocalStorage('accessToken', payload.accessToken);
      setLocalStorage('refreshToken', payload.refreshToken);
    }
    if (mutation.type === 'auth/REMOVE_TOKENS') {
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
    }
  });
}
