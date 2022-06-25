import Cookies from 'js-cookie';
import { call, put, takeEvery } from 'redux-saga/effects';
import { loginRequest } from 'services/auth';
import { loginFail, loginStart, loginSuccess } from 'store/redux/auth/actions';

export default function* sagas() {
  yield takeEvery(login, loginEffect);

  yield takeEvery(register, registerEffect);

  yield takeEvery(logout, logoutEffect);
}

function* loginEffect(request: any) {
  const { email, password } = request.payload;
  try {
    const uder = select();
    const result = yield call(loginRequest, { email, password });

    yield put(loginSuccess(result));
  } catch (error: any) {
    yield put(loginFail(error.toString()));
  }
}

function* registerEffect(request: any) {
  const { email, password } = request.payload;
  try {
    const result = yield call(loginRequest, { email, password });

    yield put(loginSuccess(result));
  } catch (error: any) {
    yield put(loginFail(error.toString()));
  }
}
