import { IUserData } from 'model/user';

export type ActionLoginUser = {
  type: string;
  payload: {
    isLogged: boolean;
    loginUserData: IUserData;
    loginError: string;
  };
};
