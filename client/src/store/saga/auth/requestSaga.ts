import { IUserDataLoggedIn } from 'model/user';
import { call, put } from 'redux-saga/effects';
import { loginRequest } from 'services/auth';
import {
  loginFail,
  loginSuccess,
  logoutSuccess,
} from 'store/redux/auth/actions';

export function* onLoginSagaRequest(action: any) {
  try {
    const response: { data: IUserDataLoggedIn } = yield call(
      loginRequest,
      action.payload,
    );

    yield put(loginSuccess(response.data));
  } catch (error: any) {
    const loginError = error.response.data.error;

    yield put(loginFail(loginError));
  }
}

export function* onLogoutSagaRequest() {
  yield put(logoutSuccess());
}
