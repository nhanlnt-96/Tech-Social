import { takeEvery } from 'redux-saga/effects';
import { LOGIN_START } from 'store/redux/auth/actionTypes';
import { onLoginSagaRequest } from 'store/saga/auth/requestSaga';

export function* onLoginSagaHandler() {
  yield takeEvery(LOGIN_START, onLoginSagaRequest);
}
