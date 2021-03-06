import { message } from 'antd';
import Cookies from 'js-cookie';
import { ILoginUser, IUserDataLoggedIn } from 'model/user';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from 'store/redux/auth/actionTypes';

export const loginStart = (userInput: ILoginUser) => {
  const { email, password } = userInput;

  return {
    type: LOGIN_START,
    payload: { email, password },
  };
};

export const loginSuccess = (userData: IUserDataLoggedIn) => {
  const expireAccessToken = new Date(Date.parse(userData.token.access.expire));

  Cookies.set('accessToken', userData.token.access.token, {
    expires: expireAccessToken,
  });

  Cookies.set('userProfile', JSON.stringify(userData.user), {
    expires: expireAccessToken,
  });

  message.success('Logged in 😍');

  return {
    type: LOGIN_SUCCESS,
    payload: {
      loginUserData: userData.user,
    },
  };
};

export const loginFail = (loginError: string) => {
  message.error(loginError);

  return {
    type: LOGIN_FAIL,
    payload: { loginError },
  };
};

export const logoutStart = () => {
  Cookies.remove('accessToken');

  Cookies.remove('userProfile');

  message.success('Logged out 😍');

  return {
    type: LOGOUT_START,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
