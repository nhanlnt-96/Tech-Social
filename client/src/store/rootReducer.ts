import { combineReducers } from 'redux';
import loginUserReducer, { ILoginUserState } from 'store/redux/auth';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';
import getUserProfileReducer, { IUserState } from 'store/redux/user';

export interface IRootState {
  registerGoogle: IRegisterGoogle;
  loginUser: ILoginUserState;
  getUserProfile: IUserState;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
  loginUser: loginUserReducer,
  getUserProfile: getUserProfileReducer,
});

export default rootReducer;
