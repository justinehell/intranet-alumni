import {
  createTokens,
  getCurrentUser,
  getRefreshToken,
} from '../../services/auth';
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
      createTokens(data)
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
    getCurrentUser().then((r) => {
      commit('SET_USER', r.data);
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
      getRefreshToken({ refresh: state.refreshToken })
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
};

export default {
  namespaced: true,
  strict: false,
  state,
  getters,
  actions,
  mutations,
};
