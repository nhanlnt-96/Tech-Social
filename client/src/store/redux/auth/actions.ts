import { LOGIN_SUCCESS } from 'store/redux/auth/actionTypes';

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isLogged: true,
    },
  };
};
