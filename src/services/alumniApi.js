import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import store from '../store';
import router from '../router';

import { getLocalStorageItem } from './localStorage';
import { ERROR, NOTIFICATION } from '../utils/notifications';

const alumniApiClient = axios.create({
  baseURL: process.env.VUE_APP_ALUMNI_URL,
  timeout: 15000,
});

alumniApiClient.interceptors.request.use(
  function(request) {
    if (request.data) {
      request.data = snakecaseKeys(request.data, { deep: true });
    }
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

alumniApiClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    response.data = camelcaseKeys(response.data, { deep: true });
    return Promise.resolve(response);
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if (
      error.response?.status === 401 &&
      error.response?.data?.errors[0]?.code === 'token_not_valid'
    ) {
      if (error.config.url !== 'auth/jwt/refresh/') {
        // Try request again with new token
        return store
          .dispatch('auth/refreshToken')
          .then(() => {
            // New request with new token
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${getLocalStorageItem(
              'accessToken'
            )}`;

            return new Promise((resolve, reject) => {
              alumniApiClient
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            store.dispatch('auth/logout');
            router.push({ name: 'Login' });
            return Promise.reject(error);
          });
      } else {
        // if refresh token expired
        store.dispatch('auth/logout');
        router.push({ name: 'Login' });
        return Promise.reject(error);
      }
    }

    // handle global error - not related to a specific field
    const errors = error.response.data.errors;
    const { code } = errors.find((err) => !err.field);
    if (code) {
      store.dispatch('notifications/showNotification', {
        type: NOTIFICATION.ERROR,
        code: ERROR[code.toUpperCase()],
      });
    }
    // Return any error which is not due to authentication back to the calling service
    return Promise.reject(error);
  }
);

export default alumniApiClient;
