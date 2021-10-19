import { IRegisterGoogleUser, IRegisterUser } from 'model/user';
import api from 'configs/axios';

export const registerRequest = (
  _id: string,
  userData: IRegisterUser | IRegisterGoogleUser,
) => {
  return api.post('/auth', {
    _id,
    fullName:
      ('fullName' in userData && userData.fullName) ||
      ('displayName' in userData && userData.displayName),
    email: userData.email,
    avatarImageURL: ('photoURL' in userData && userData.photoURL) || null,
  });
};
