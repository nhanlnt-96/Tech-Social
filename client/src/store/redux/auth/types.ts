import { IUserData } from 'model/user';

export type ActionLoginUser = {
  type: string;
  payload: {
    isLogged: boolean;
    getAuthData: IUserData;
    getAuthError: any;
  };
};
