import Vue from 'vue';
import { convertArrayToObject } from '../../utils';
import { NOTIFICATION, SUCCESS } from '../../utils/notifications';
import {
  addStudentJob,
  deleteStudentJob,
  editStudent,
  editStudentJob,
  getCurrentStudent,
  getStudents,
  getStudent,
} from '../../services/students';

const state = {
  students: {},
  totalStudents: 0,
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

  getStudentById: (state) => (id) => {
    return state.students[id];
  },

  studentsNumber: (state) => {
    return Object.keys(state.students).length;
  },
};

// actions
export const actions = {
  getStudents({ commit }, page) {
    return new Promise((resolve, reject) => {
      getStudents(page)
        .then((r) => {
          commit('SET_STUDENTS', r.data.results);
          commit('SET_MAX_STUDENTS', r.data.count);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getStudent({ commit }, id) {
    return new Promise((resolve, reject) => {
      getStudent(id)
        .then((r) => {
          commit('UPDATE_STUDENT', r.data);
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
          commit('UPDATE_STUDENT', r.data);
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

  editJob({ dispatch }, job) {
    return new Promise((resolve, reject) => {
      editStudentJob(job)
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
      addStudentJob(job)
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
      deleteStudentJob(id)
        .then(() => {
          commit('DELETE_STUDENT_JOB', {
            id,
            studentId: getters.userStudent.id,
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
  SET_STUDENTS(state, students) {
    let studentsObject = convertArrayToObject(students, 'id');
    state.students = { ...state.students, ...studentsObject };
  },
  SET_MAX_STUDENTS(state, totalStudents) {
    state.totalStudents = totalStudents;
  },
  UPDATE_STUDENT(state, newStudent) {
    // Use Vue.set() when we neet to update a nested data - this way it'll be reactive
    Vue.set(state.students, newStudent.id, newStudent);
  },
  DELETE_STUDENT_JOB(state, data) {
    const deletingJobIndex = state.students[data.studentId]?.jobs.findIndex(
      (job) => job.id === data.id
    );
    deletingJobIndex !== -1
      ? state.students[data.studentId].jobs.splice(deletingJobIndex, 1)
      : null;
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
