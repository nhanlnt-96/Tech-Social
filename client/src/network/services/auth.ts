import api from 'configs/axios';
import { ILoginUser, IRegisterGoogleUser, IRegisterUser } from 'model/user';

export const registerRequest = async (
  userData: IRegisterUser | IRegisterGoogleUser,
  password?: string,
): Promise<any> => {
  return api.post<any>('/auth', {
    password: ('password' in userData && userData.password) || password,
    fullName:
      ('fullName' in userData && userData.fullName) ||
      ('displayName' in userData && userData.displayName),
    email: userData.email,
    avatarImageURL: ('photoURL' in userData && userData.photoURL) || null,
  });
};

export const loginRequest = async (userData: ILoginUser): Promise<any> => {
  const { email, password } = userData;

  return api.post<any>('/auth/login', {
    email,
    password,
  });
};

export const validateToken = (token: string) => {
  return api.post('/auth/validate-token', { token });
};

export const resetPasswordRequest = (email: string) => {
  return api.post('/auth/change-password-request', {
    email,
  });
};

export const resetPassword = (token: string, password: string) => {
  return api.patch(`/auth/reset-password/user/${token}`, {
    password,
  });
};
