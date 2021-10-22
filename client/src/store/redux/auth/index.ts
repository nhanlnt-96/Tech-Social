import { ActionLoginUser } from 'store/redux/auth/types';
import {
  GET_AUTH_FAIL,
  GET_AUTH_START,
  GET_AUTH_SUCCESS,
  LOGIN_SUCCESS,
} from 'store/redux/auth/actionTypes';
import { IUserData } from 'model/user';

export interface ILoginUser {
  isLogged: boolean;
  getAuthLoading: boolean;
  userAuthData: IUserData;
  getAuthError: any;
}

const loginUserState: ILoginUser = {
  isLogged: false,
  getAuthLoading: true,
  userAuthData: {
    avatarImageURL: '',
    email: '',
    fullName: '',
    iat: 0,
    id: '',
    isVerify: false,
  },
  getAuthError: {},
};

const loginUserReducer = (state = loginUserState, action: ActionLoginUser) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogged: action.payload.isLogged,
      };
    case GET_AUTH_START:
      return {
        getAuthLoading: true,
      };
    case GET_AUTH_SUCCESS: {
      const { avatarImageURL, email, fullName, iat, id, isVerify } =
        action.payload.getAuthData;
      return {
        getAuthLoading: false,
        userAuthData: {
          avatarImageURL,
          email,
          fullName,
          iat,
          id,
          isVerify,
        },
      };
    }
    case GET_AUTH_FAIL:
      return {
        getAuthLoading: false,
        getAuthError: action.payload.getAuthError,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
