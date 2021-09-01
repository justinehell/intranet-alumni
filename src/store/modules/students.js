import { convertArrayToObject } from '../../utils';
import { NOTIFICATION, SUCCESS } from '../../utils/notifications';
import {
  editStudent,
  getCurrentStudent,
  getStudents,
} from '../../services/students';

const state = {
  students: [],
};

// getters
const getters = {
  studentsList: (state) => {
    return Object.values(state.students);
  },

  userStudent: (state, getters, rootState) => {
    return getters.studentsList.find(
      (student) => student.user === rootState.auth.user?.id
    );
  },
};

// actions
export const actions = {
  getStudents({ commit }) {
    return new Promise((resolve, reject) => {
      getStudents()
        .then((r) => {
          commit('SET_STUDENTS', r.data.results);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  me({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentStudent()
        .then((r) => {
          commit('SET_STUDENTS', [r.data]);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  edit({ commit, dispatch }, student) {
    return new Promise((resolve, reject) => {
      editStudent(student)
        .then((r) => {
          commit('UPDATE_STUDENT', r.data);
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
};

// mutations
const mutations = {
  SET_STUDENTS(state, students) {
    state.students = convertArrayToObject(students, 'id');
  },
  UPDATE_STUDENT(state, newStudent) {
    state.students[newStudent.id] = newStudent;
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
