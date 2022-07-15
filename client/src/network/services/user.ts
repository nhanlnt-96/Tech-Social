import api from 'configs/axios';

export const getUserProfileInfo = (userId: string) => {
  return api.get(`/auth/profile/${userId}`);
};

export const updateUserProfileInfo = (
  fullName?: string | null,
  location?: string | null,
  about?: string | null,
  coverImageURL?: string | null,
  avatarImageURL?: string | null,
) => {
  return api.patch('/auth/profile/update', {
    fullName: fullName || null,
    location: location || null,
    about: about || null,
    coverImageURL: coverImageURL || null,
    avatarImageURL: avatarImageURL || null,
  });
};
