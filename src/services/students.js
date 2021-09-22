import snakecaseKeys from 'snakecase-keys';
import alumniApiClient from './alumniApi';

// export const getStudents = (page) => {
//   return alumniApiClient.get(`students/?page=${page}`);
// };

const queryString = require('query-string');

export const getStudents = (query) => {
  query = snakecaseKeys(query, { deep: true });
  let queryParams = query
    ? `?${queryString.stringify(query, {
        skipEmptyString: true,
        skipNull: true,
      })}`
    : '';
  return alumniApiClient.get(`students/${queryParams}`);
};

export const getStudent = (id) => {
  return alumniApiClient.get(`students/${id}`);
};

export const getCurrentStudent = () => {
  return alumniApiClient.get('students/me/');
};

export const editStudent = (student) => {
  const id = student.id;
  return alumniApiClient.patch(`students/${id}/`, student);
};

export const editStudentJob = (job) => {
  const id = job.id;
  return alumniApiClient.patch(`jobs/${id}/`, job);
};

export const addStudentJob = (job) => {
  return alumniApiClient.post(`jobs/`, job);
};

export const deleteStudentJob = (id) => {
  return alumniApiClient.delete(`jobs/${id}`);
};
