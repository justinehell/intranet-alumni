import alumniApiClient from '../../services/authApi';
import { convertArrayToObject } from '../../utils';

const state = {
  students: null,
};

// getters
const getters = {
  studentsList: (state) => {
    return Object.values(state.students);
  },
};

// actions
export const actions = {
  getStudents({ commit }) {
    return new Promise((resolve, reject) => {
      alumniApiClient
        .get('students/')
        .then((r) => {
          console.log(r);
          commit('SET_STUDENTS', r.data.results);
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
  SET_STUDENTS(state, students) {
    state.students = convertArrayToObject(students, 'id');
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
