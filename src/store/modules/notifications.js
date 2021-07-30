const state = {
  notifications: null,
};

// getters
const getters = {};

// actions
export const actions = {
  showNotification({ commit }, notification) {
    commit('SET_NOTIFICATION', notification);
  },
  removeNotification({ commit }, notification) {
    commit('REMOVE_NOTIFICATION', notification);
  },
};

// mutations
const mutations = {
  SET_NOTIFICATION(state, notification) {
    state.notifications = notification;
  },
  REMOVE_NOTIFICATION(state, notification) {
    state.notifications = notification;
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
