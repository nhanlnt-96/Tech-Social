import api from 'configs/axios';

export const getUserProfileInfo = (userId: string) => {
  return api.get(`/auth/profile/${userId}`);
};

export const updateUserProfileInfo = (
  fullName: string,
  location: string,
  about: string,
) => {
  return api.patch('/auth/profile/update', { fullName, location, about });
};
