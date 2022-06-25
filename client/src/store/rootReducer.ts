import { combineReducers } from 'redux';
import loginUserReducer, { IAuthState } from 'store/redux/auth';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';
import getUserProfileReducer, { IUserState } from 'store/redux/user';

export interface IRootState {
  auth: IAuthState;
  user: IUserState;
  registerGoogle: IRegisterGoogle;
  loginUser: IAuthState;
  getUserProfile: IUserState;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
  loginUser: loginUserReducer,
  getUserProfile: getUserProfileReducer,
});

export default rootReducer;
