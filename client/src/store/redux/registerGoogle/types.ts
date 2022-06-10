import { IRegisterGoogleUser } from 'model/user';

export type ActionRegisterGoogle = {
  type: string;
  payload: {
    isSuccess: boolean;
    data: IRegisterGoogleUser;
  };
};
