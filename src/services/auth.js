import alumniApiClient from './alumniApi';

export const createTokens = (data) => {
  return alumniApiClient.post('auth/jwt/create/', data);
};

export const getCurrentUser = () => {
  return alumniApiClient.get('auth/users/me/');
};

export const getRefreshToken = (token) => {
  return alumniApiClient.post('auth/jwt/refresh/', token);
};

export const registerUser = (data) => {
  return alumniApiClient.post('auth/users/', data);
};
