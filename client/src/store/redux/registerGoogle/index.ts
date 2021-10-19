import { ActionRegisterGoogle } from 'store/redux/registerGoogle/types';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from 'store/redux/registerGoogle/actionTypes';
import { IRegisterGoogleUser } from 'model/user';

export interface IRegisterGoogle {
  registerSuccess: {
    isSuccess: boolean;
    data: IRegisterGoogleUser;
  };
}

const registerGoogleState: IRegisterGoogle = {
  registerSuccess: {
    isSuccess: false,
    data: {
      displayName: '',
      email: '',
      photoURL: '',
    },
  },
};

const registerGoogleReducer = (
  state = registerGoogleState,
  action: ActionRegisterGoogle,
): IRegisterGoogle => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const {
        isSuccess,
        data: { displayName, email, photoURL },
      } = action.payload;
      return {
        registerSuccess: {
          isSuccess,
          data: {
            displayName,
            email,
            photoURL,
          },
        },
      };
    case REGISTER_FAIL:
      return {
        registerSuccess: {
          isSuccess: false,
          data: {
            displayName: '',
            email: '',
            photoURL: '',
          },
        },
      };
    default:
      return state;
  }
};

export default registerGoogleReducer;
