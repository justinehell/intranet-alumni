import {
  setLocalStorage,
  removeLocalStorage,
} from '../../services/localStorage';
import alumniApiClient, {
  addBearerHeader,
  deleteBearerHeader,
} from '../../services/authApi';
import router from '../../router';

const state = {
  accessToken: '',
  refreshToken: '',
};

// getters
const getters = {
  isLogged(state) {
    return !!state.accessToken;
  },
};

// actions
export const actions = {
  login({ commit }, data) {
    return alumniApiClient.post('auth/jwt/create', data).then((r) => {
      const tokens = {
        accessToken: r.data.access,
        refreshToken: r.data.refresh,
      };
      commit('SET_TOKENS', tokens);
      // commit('SET_REFRESH_TOKEN', tokens.refreshToken);
      addBearerHeader(tokens.accessToken);
      setLocalStorage('accessToken', tokens.accessToken);
      setLocalStorage('refreshToken', tokens.refreshToken);
      router.push({ name: 'Home' });
      // return r ??
    });
  },
  register({ commit }, data) {
    return alumniApiClient.post('auth/users/', data).then((r) => {
      commit('REGISTER', r);
      // return r ??
    });
  },
  logout({ commit }) {
    commit('REMOVE_TOKENS');
    // commit('REMOVE_REFRESH_TOKEN');
    deleteBearerHeader();
    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');
    router.push({ name: 'Login' });
  },
};

// mutations
const mutations = {
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
  //   SET_REFRESH_TOKEN(state, refreshToken) {
  //     state.refreshToken = refreshToken;
  //   },
  REMOVE_TOKENS(state) {
    state.accessToken = '';
    state.refreshToken = '';
  },
  REGISTER(state, data) {
    console.log({ state }, { data });
  },
};

export default {
  namespaced: true,
  strict: false,
  state,
  getters,
  actions,
  mutations,
};
