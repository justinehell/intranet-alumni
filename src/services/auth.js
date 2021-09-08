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

export const activateUser = (data) => {
  return alumniApiClient.post('/auth/users/activation/', data);
};

export const resetPassword = (data) => {
  return alumniApiClient.post('/auth/users/reset_password/', data);
};

export const resetPasswordConfirmation = (data) => {
  return alumniApiClient.post('/auth/users/reset_password_confirm/', data);
};
