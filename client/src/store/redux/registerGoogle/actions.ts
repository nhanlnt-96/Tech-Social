import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from 'store/redux/registerGoogle/actionTypes';
import { IRegisterGoogleUser } from 'model/user';

export const registerWithGoogleSuccess = (userInput: IRegisterGoogleUser) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      isSuccess: true,
      data: {
        displayName: userInput.displayName,
        email: userInput.email,
        photoURL: userInput.photoURL,
      },
    },
  };
};

export const registerWithGoogleFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};
