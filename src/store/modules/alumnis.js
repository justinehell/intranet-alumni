import Vue from 'vue';
import { convertArrayToObject } from '../../utils';
import { NOTIFICATION, SUCCESS } from '../../utils/notifications';
import {
  addAlumniJob,
  deleteAlumniJob,
  editAlumni,
  editAlumniJob,
  getCurrentAlumni,
  getAlumnis,
  getAlumni,
} from '../../services/alumnis';

const state = {
  alumnis: {},
  totalAlumnis: 0,
  caMemberAlumnis: null,
  contributorAlumnis: null,
  hasNext: false,
  hasPrevious: false,
};

// getters
const getters = {
  alumniList: (state) => {
    return Object.values(state.alumnis);
  },
  userAlumni: (state, getters, rootState) => {
    return getters.alumniList.find(
      (alumni) => alumni.user === rootState.auth.user?.id
    );
  },
  getAlumniById: (state) => (id) => {
    return state.alumnis[id];
  },
  alumnisNumber: (state) => {
    return Object.keys(state.alumnis).length;
  },
};

// actions
export const actions = {
  getAlumnis({ commit }, query = { page: 1 }) {
    return new Promise((resolve, reject) => {
      getAlumnis(query)
        .then((r) => {
          commit('SET_ALUMNIS', r.data.results);
          commit('SET_MAX_ALUMNIS', r.data.count);
          commit('SET_NEXT', r.data.next);
          commit('SET_PREVIOUS', r.data.previous);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getCaMemberAlumnis({ commit }, query = { isCaMember: true }) {
    return new Promise((resolve, reject) => {
      getAlumnis(query)
        .then((r) => {
          commit('SET_CA_MEMBER_ALUMNIS', r.data.results);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getContributorAlumnis(
    { commit, dispatch },
    query = { isContributor: true, page: 1 }
  ) {
    return new Promise((resolve, reject) => {
      getAlumnis(query)
        .then((r) => {
          commit('SET_CONTRIBUTOR_ALUMNIS', r.data.results);
          r.data.next &&
            dispatch('getContributorAlumnis', {
              ...query,
              page: query.page + 1,
            });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getAlumni({ commit }, id) {
    return new Promise((resolve, reject) => {
      getAlumni(id)
        .then((r) => {
          commit('UPDATE_ALUMNI', r.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  me({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentAlumni()
        .then((r) => {
          commit('UPDATE_ALUMNI', r.data);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  edit({ commit, dispatch }, alumni) {
    return new Promise((resolve, reject) => {
      editAlumni(alumni)
        .then((r) => {
          commit('UPDATE_ALUMNI', r.data);
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.USER_EDITION,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  editJob({ dispatch }, job) {
    return new Promise((resolve, reject) => {
      editAlumniJob(job)
        .then(() => {
          dispatch('me');
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.USER_JOB_EDITION,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  addJob({ dispatch }, job) {
    return new Promise((resolve, reject) => {
      addAlumniJob(job)
        .then(() => {
          dispatch('me');
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.USER_JOB_ADD,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  deleteJob({ commit, dispatch, getters }, id) {
    return new Promise((resolve, reject) => {
      deleteAlumniJob(id)
        .then(() => {
          commit('DELETE_ALUMNI_JOB', {
            id,
            alumniId: getters.userAlumni.id,
          });
          dispatch(
            'notifications/showNotification',
            {
              type: NOTIFICATION.SUCCESS,
              code: SUCCESS.USER_JOB_DELETE,
            },
            { root: true }
          );
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
};

// mutations
const mutations = {
  SET_ALUMNIS(state, alumnis) {
    let alumnisObject = convertArrayToObject(alumnis, 'id');
    state.alumnis = alumnisObject;
  },
  SET_MAX_ALUMNIS(state, totalAlumnis) {
    state.totalAlumnis = totalAlumnis;
  },
  UPDATE_ALUMNI(state, newAlumni) {
    // Use Vue.set() when we neet to update a nested data - this way it'll be reactive
    Vue.set(state.alumnis, newAlumni.id, newAlumni);
  },
  DELETE_ALUMNI_JOB(state, data) {
    const deletingJobIndex = state.alumnis[data.alumniId]?.jobs.findIndex(
      (job) => job.id === data.id
    );
    deletingJobIndex !== -1
      ? state.alumnis[data.alumniId].jobs.splice(deletingJobIndex, 1)
      : null;
  },

  SET_CA_MEMBER_ALUMNIS(state, data) {
    state.caMemberAlumnis = data;
  },

  SET_CONTRIBUTOR_ALUMNIS(state, data) {
    if (state.contributorAlumnis) {
      state.contributorAlumnis = [...state.contributorAlumnis, ...data];
    } else {
      state.contributorAlumnis = data;
    }
  },

  SET_NEXT(state, data) {
    state.hasNext = !!data;
  },

  SET_PREVIOUS(state, data) {
    state.hasPrevious = !!data;
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
