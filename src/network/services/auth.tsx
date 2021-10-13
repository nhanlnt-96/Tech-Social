import { IRegisterUser } from 'model/user';
import api from 'configs/axios';

export const registerRequest = (_id: string, userData: IRegisterUser) => {
  const { fullName, password, email } = userData;
  return api.post('/auth', {
    _id,
    fullName,
    password,
    email,
  });
};
