import alumniApiClient from './alumniApi';

export const getStudents = (page = 1) => {
  return alumniApiClient.get(`students/?page=${page}`);
};

export const getOneStudent = (id) => {
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
