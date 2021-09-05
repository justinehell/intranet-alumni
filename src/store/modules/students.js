import { convertArrayToObject } from '../../utils';
import { NOTIFICATION, SUCCESS } from '../../utils/notifications';
import {
  addStudentJob,
  deleteStudentJob,
  editStudent,
  editStudentJob,
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

  editJob({ commit, dispatch }, job) {
    return new Promise((resolve, reject) => {
      editStudentJob(job)
        .then((r) => {
          commit('UPDATE_STUDENT_JOB', r.data);
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

  addJob({ commit, dispatch }, job) {
    return new Promise((resolve, reject) => {
      addStudentJob(job)
        .then((r) => {
          commit('ADD_STUDENT_JOB', r.data);
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

  deleteJob({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      deleteStudentJob(id)
        .then(() => {
          getCurrentStudent()
            .then((r) => {
              commit('DELETE_STUDENT_JOB', { id, studentId: r.data.id });
            })
            .catch((error) => reject(error));
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
  UPDATE_STUDENT_JOB(state, newJob) {
    const studentId = newJob.student;
    const oldJobIndex = state.students[studentId]?.jobs.findIndex(
      (job) => job.id === newJob.id
    );
    oldJobIndex !== -1
      ? (state.students[studentId].jobs[oldJobIndex] = newJob)
      : null;
  },
  ADD_STUDENT_JOB(state, newJob) {
    const studentId = newJob.student;
    state.students[studentId].jobs.unshift(newJob);
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
