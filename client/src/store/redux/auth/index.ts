import { ActionLoginUser } from 'store/redux/auth/types';
import { LOGIN_SUCCESS } from 'store/redux/auth/actionTypes';

export interface ILoginUser {
  isLogged: boolean;
}

const loginUserState: ILoginUser = {
  isLogged: false,
};

const loginUserReducer = (state = loginUserState, action: ActionLoginUser) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogged: action.payload.isLogged,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
