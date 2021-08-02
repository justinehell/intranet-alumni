import Vue from 'vue';
import Vuex from 'vuex';
import handleBearerHeader from '../plugins/handleBearerHeader';
import handleTokenInLocalStorage from '../plugins/webStorage';

// modules
import auth from './modules/auth';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [handleTokenInLocalStorage, handleBearerHeader],
  modules: {
    auth,
    notifications,
  },
  actions: {
    setInitialData({ dispatch }) {
      dispatch('auth/me');
    },
  },
});
