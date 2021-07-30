import Vue from 'vue';
import Vuex from 'vuex';

// modules
import auth from './modules/auth';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    notifications,
  },
});
