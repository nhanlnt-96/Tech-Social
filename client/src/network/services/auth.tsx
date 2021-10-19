import { IRegisterGoogleUser, IRegisterUser } from 'model/user';
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
