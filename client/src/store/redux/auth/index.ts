import { IUserData } from 'model/user';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from 'store/redux/auth/actionTypes';
import { ActionLoginUser } from 'store/redux/auth/types';

export interface IAuthState {
  userLogin: {
    isLogged: boolean;
    isLoading: boolean;
    loginUserData: IUserData;
    loginError: string;
  };
  isLogged?: boolean;
  isLoading?: boolean;
  loginUserData?: IUserData;
  loginError?: string;
  resetPasswordPending?: boolean;
  resetPasswordSuccess?: boolean;
}

const loginUserState: IAuthState = {
  userLogin: {
    isLogged: false,
    isLoading: false,
    loginUserData: {
      email: '',
      fullName: '',
      isVerify: false,
      id: '',
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

    case LOGOUT_START:
      return {
        userLogin: {
          ...state.userLogin,
          isLoading: true,
        },
      };

    case LOGOUT_SUCCESS:
      return {
        userLogin: {
          ...state.userLogin,
          isLoading: false,
          isLogged: false,
        },
      };
    default:
      return state;
  }
};

export default loginUserReducer;
