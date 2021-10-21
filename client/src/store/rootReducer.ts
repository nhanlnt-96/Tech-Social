import { combineReducers } from 'redux';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';
import loginUserReducer, { ILoginUser } from 'store/redux/auth';

export interface IRootState {
  registerGoogle: IRegisterGoogle;
  loginUser: ILoginUser;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
  loginUser: loginUserReducer,
});

export default rootReducer;
