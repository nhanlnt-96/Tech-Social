import { select, takeEvery } from 'redux-saga/effects';
import { LOGIN_START, LOGOUT_START } from 'store/redux/auth/actionTypes';
import {
  onLoginSagaRequest,
  onLogoutSagaRequest,
} from 'store/saga/auth/requestSaga';

export function* onLoginSagaHandler() {
  const users = yield select();

  yield takeEvery(LOGIN_START, onLoginSagaRequest);
}

export function* onLogoutSagaHandler() {
  yield takeEvery(LOGOUT_START, onLogoutSagaRequest);
}
