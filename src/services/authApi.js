import axios from 'axios';
//import { camelcaseKeys } from 'lodash';
//import store from '../store';

const alumniApiClient = axios.create({
  baseURL: process.env.VUE_APP_ALUMNI_URL,
  timeout: 15000,
});

alumniApiClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    //response.data = camelcaseKeys(response.data, { deep: true });
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    //store.dispatch('auth/logout');
    return Promise.reject(error);
  }
);

export default alumniApiClient;
