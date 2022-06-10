import { combineReducers } from 'redux';
import loginUserReducer, { ILoginUserState } from 'store/redux/auth';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';

export interface IRootState {
  registerGoogle: IRegisterGoogle;
  loginUser: ILoginUserState;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
  loginUser: loginUserReducer,
});

export default rootReducer;
