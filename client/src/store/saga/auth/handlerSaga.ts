import { takeEvery } from 'redux-saga/effects';
import { GET_AUTH_START } from 'store/redux/auth/actionTypes';
import { onGetAuthSagaRequest } from 'store/saga/auth/resquestSaga';

export function* onGetAuthSagaHandler() {
  yield takeEvery(GET_AUTH_START, onGetAuthSagaRequest);
}
