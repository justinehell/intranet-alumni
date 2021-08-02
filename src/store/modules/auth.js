import alumniApiClient from '../../services/authApi';
import { NOTIFICATION, SUCCESS } from '../../utils/notifications';

const state = {
  user: {},
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
  login({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      alumniApiClient
        .post('auth/jwt/create', data)
        .then((r) => {
          const tokens = {
            accessToken: r.data.access,
            refreshToken: r.data.refresh,
          };
          commit('SET_TOKENS', tokens);
          dispatch('me');
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.LOGGED_IN,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  me({ commit }) {
    alumniApiClient.get('auth/users/me').then((r) => {
      commit('SET_USER', r.data);
    });
  },
  register({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      alumniApiClient
        .post('auth/users/', data)
        .then((r) => {
          commit('REGISTER', r);
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.REGISTRATION,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    commit('REMOVE_TOKENS');
  },
  setAuthTokens({ commit }, tokens) {
    commit('SET_TOKENS', tokens);
  },
};

// mutations
const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
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
