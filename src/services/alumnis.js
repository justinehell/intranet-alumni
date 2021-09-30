import snakecaseKeys from 'snakecase-keys';
import queryString from 'query-string';

import alumniApiClient from './alumniApi';

export const getAlumnis = (query) => {
  query = snakecaseKeys(query, { deep: true });
  let queryParams = query
    ? `?${queryString.stringify(query, {
        skipEmptyString: true,
        skipNull: true,
      })}`
    : '';
  return alumniApiClient.get(`students/${queryParams}`);
};

export const getAlumni = (id) => {
  return alumniApiClient.get(`students/${id}`);
};

export const getCurrentAlumni = () => {
  return alumniApiClient.get('students/me/');
};

export const editAlumni = (alumni) => {
  const id = alumni.id;
  return alumniApiClient.patch(`students/${id}/`, alumni);
};

export const editAlumniJob = (job) => {
  const id = job.id;
  return alumniApiClient.patch(`jobs/${id}/`, job);
};

export const addAlumniJob = (job) => {
  return alumniApiClient.post(`jobs/`, job);
};

export const deleteAlumniJob = (id) => {
  return alumniApiClient.delete(`jobs/${id}`);
};
