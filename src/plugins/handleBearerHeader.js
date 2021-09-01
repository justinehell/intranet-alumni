import alumniApiClient from '../services/alumniApi';

export default function handleBearerHeader(store) {
  store.subscribe((mutation) => {
    if (mutation.type === 'auth/SET_TOKENS') {
      const payload = mutation.payload;
      alumniApiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${payload.accessToken}`;
    }
    if (mutation.type === 'auth/REMOVE_TOKENS') {
      delete alumniApiClient.defaults.headers.common['Authorization'];
    }
  });
}
