import { fork } from 'redux-saga/effects';
import { onGetAuthSagaHandler } from 'store/saga/auth/handlerSaga';

function* rootSaga() {
  yield fork(onGetAuthSagaHandler);
}

export default rootSaga;
