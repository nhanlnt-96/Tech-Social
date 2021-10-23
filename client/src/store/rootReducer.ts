import { combineReducers } from 'redux';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';
import loginUserReducer, { ILoginUserState } from 'store/redux/auth';

export interface IRootState {
  registerGoogle: IRegisterGoogle;
  loginUser: ILoginUserState;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
  loginUser: loginUserReducer,
});

export default rootReducer;
