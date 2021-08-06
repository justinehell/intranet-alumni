import alumniApiClient from '../../services/authApi';
import { INFO, NOTIFICATION, SUCCESS } from '../../utils/notifications';

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
        .post('auth/jwt/create/', data)
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
    alumniApiClient.get('auth/users/me/').then((r) => {
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
  logout({ commit, dispatch }) {
    commit('REMOVE_TOKENS');
    dispatch(
      'notifications/showNotification',
      {
        type: NOTIFICATION.INFO,
        code: INFO.SIGN_OUT,
      },
      { root: true }
    );
  },
  setAuthTokens({ commit }, tokens) {
    commit('SET_TOKENS', tokens);
  },
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      alumniApiClient
        .post('auth/jwt/refresh/', { refresh: state.refreshToken })
        .then((r) => {
          commit('SET_TOKENS', {
            accessToken: r.data.access,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

// mutations
const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken || state.accessToken;
    state.refreshToken = tokens.refreshToken || state.refreshToken;
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
