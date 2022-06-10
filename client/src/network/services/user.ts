import api from 'configs/axios';

export const getUserProfileInfo = (userId: string) => {
  return api.get(`/auth/profile/${userId}`);
};
