import { combineReducers } from 'redux';
import registerGoogleReducer, {
  IRegisterGoogle,
} from 'store/redux/registerGoogle';

export interface IRootState {
  registerGoogle: IRegisterGoogle;
}

export const rootReducer = combineReducers({
  registerGoogle: registerGoogleReducer,
});

export default rootReducer;
