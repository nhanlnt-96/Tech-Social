import {
  GET_AUTH_FAIL,
  GET_AUTH_START,
  GET_AUTH_SUCCESS,
  LOGIN_SUCCESS,
} from 'store/redux/auth/actionTypes';
import { IUserData } from 'model/user';

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isLogged: true,
    },
  };
};

export const getAuthStart = () => {
  return {
    type: GET_AUTH_START,
  };
};

export const getAuthSuccess = (getAuthData: IUserData) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: { getAuthData },
  };
};

export const getAuthFail = (getAuthError: any) => {
  return {
    type: GET_AUTH_FAIL,
    payload: getAuthError,
  };
};
