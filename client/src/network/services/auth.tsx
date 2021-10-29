import { ILoginUser, IRegisterGoogleUser, IRegisterUser } from 'model/user';
import api from 'configs/axios';

export const registerRequest = (
  userData: IRegisterUser | IRegisterGoogleUser,
  password?: string,
) => {
  return api.post('/auth', {
    password: ('password' in userData && userData.password) || password,
    fullName:
      ('fullName' in userData && userData.fullName) ||
      ('displayName' in userData && userData.displayName),
    email: userData.email,
    avatarImageURL: ('photoURL' in userData && userData.photoURL) || null,
  });
};

export const loginRequest = (userData: ILoginUser) => {
  const { email, password } = userData;
  return api.post('/auth/login', {
    email,
    password,
  });
};

export const resetPasswordRequest = (email: string) => {
  return api.post('/auth/change-password-request', {
    email,
  });
};

export const resetPassword = (token: string, password: string) => {
  return api.put(`/auth/reset-password/user/${token}`, {
    password,
  });
};
