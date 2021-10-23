import { ActionLoginUser } from 'store/redux/auth/types';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
} from 'store/redux/auth/actionTypes';
import { IUserData } from 'model/user';

export interface ILoginUserState {
  userLogin: {
    isLogged: boolean;
    isLoading: boolean;
    loginUserData: IUserData;
    loginError: string;
  };
}

const loginUserState: ILoginUserState = {
  userLogin: {
    isLogged: false,
    isLoading: false,
    loginUserData: {
      email: '',
      fullName: '',
      isVerify: false,
      id: '',
      iat: 0,
      avatarImageURL: '',
    },
    loginError: '',
  },
};

const loginUserReducer = (state = loginUserState, action: ActionLoginUser) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        userLogin: {
          ...state.userLogin,
          isLoading: true,
        },
      };
    case LOGIN_SUCCESS: {
      return {
        userLogin: {
          ...state.userLogin,
          isLogged: true,
          isLoading: false,
          loginUserData: action.payload.loginUserData,
          loginError: '',
        },
      };
    }
    case LOGIN_FAIL:
      return {
        userLogin: {
          ...state.userLogin,
          isLoading: false,
          loginError: action.payload.loginError,
        },
      };
    default:
      return state;
  }
};

export default loginUserReducer;
