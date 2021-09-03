import alumniApiClient from './alumniApi';

export const getStudents = () => {
  return alumniApiClient.get('students/');
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
